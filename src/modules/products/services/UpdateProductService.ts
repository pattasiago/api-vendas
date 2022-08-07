import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';
import { injectable, inject } from 'tsyringe';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {
    const productsRepository = this.productsRepository;
    const product = await productsRepository.findOne(id);
    const redisCache = new RedisCache();

    if (!product) {
      throw new AppError('Product Not Found!');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('Product Already Exists', 403);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
