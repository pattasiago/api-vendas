import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IDeleteProduct): Promise<void> {
    const productsRepository = this.productsRepository;
    const product = await productsRepository.findOne(id);
    const redisCache = new RedisCache();

    if (!product) {
      throw new AppError('Product Not Found!');
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    productsRepository.remove(product);
  }
}

export default DeleteProductService;
