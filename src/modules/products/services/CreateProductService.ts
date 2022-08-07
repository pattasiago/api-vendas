import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import Product from '../infra/typeorm/entities/Product';
import { injectable, inject } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const productsRepository = this.productsRepository;
    const productExists = await productsRepository.findByName(name);
    const redisCache = new RedisCache();

    if (productExists) {
      throw new AppError('Product Already Exists', 403);
    }
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await productsRepository.save(product);
    return product;
  }
}

export default CreateProductService;
