import AppError from '@shared/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';
import { injectable, inject } from 'tsyringe';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: string): Promise<Product> {
    const productsRepository = this.productsRepository;
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product Not Found!');
    }
    return product;
  }
}

export default ShowProductService;
