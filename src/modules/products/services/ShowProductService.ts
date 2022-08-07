import AppError from '@shared/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { injectable, inject } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: string): Promise<IProduct> {
    const productsRepository = this.productsRepository;
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product Not Found!');
    }
    return product;
  }
}

export default ShowProductService;
