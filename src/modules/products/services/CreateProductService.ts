import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { injectable, inject } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';

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
  }: ICreateProduct): Promise<IProduct> {
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
