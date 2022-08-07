import AppError from '@shared/errors/AppError';
import { IOrder } from '../domain/models/IOrder';
import { injectable, inject } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IProduct } from '@modules/products/domain/models/IProduct';

interface ICreateOrder {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    customer_id,
    products,
  }: ICreateOrder): Promise<IOrder> {
    const ordersRepository = this.ordersRepository;
    const customersRepository = this.customersRepository;
    const productsRepository = this.productsRepository;

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Customer not Found!');
    }

    const existsProduct = await productsRepository.findAllByIds(products);

    if (!existsProduct.length) {
      throw new AppError('Not Found Any Product Given!');
    }

    const existsProductIds = existsProduct.map(product => {
      return product.id;
    });

    const checkInexistentProducts = products.filter(
      product => !existsProductIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`,
      );
    }

    const quantityAvalaiable = products.filter(
      product =>
        existsProduct.filter(p => p.id === product.id)[0].quantity <=
        product.quantity,
    );

    if (quantityAvalaiable.length) {
      throw new AppError(
        `The quantity ${quantityAvalaiable[0].quantity} is not avaliable for ${quantityAvalaiable[0].id}.`,
      );
    }

    const serializeProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProduct.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      order_products: serializeProducts,
    });

    const { order_products } = order;
    console.log(existsProduct);
    const updateProductsQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProduct.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    productsRepository.updateStock(updateProductsQuantity);

    return order;
  }
}

export default CreateOrderService;
