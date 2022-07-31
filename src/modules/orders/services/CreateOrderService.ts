import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

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
      products: serializeProducts,
    });

    const { order_products } = order;
    console.log(existsProduct);
    const updateProductsQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProduct.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updateProductsQuantity);

    return order;
  }
}

export default CreateOrderService;
