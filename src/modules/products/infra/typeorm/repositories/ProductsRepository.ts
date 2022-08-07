import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';

import {
  IFindProducts,
  IProductsRepository,
} from '@modules/products/domain/repositories/IProductsRepository';
import { getRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

export class ProductRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public create({ name, price, quantity }: ICreateProduct): Product {
    return this.ormRepository.create({ name, price, quantity });
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  public async remove(product: Product): Promise<Product> {
    return this.ormRepository.remove(product);
  }

  public async findOne(id: string): Promise<Product | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async find(ids?: string[]): Promise<Product[]> {
    if (!ids) {
      return this.ormRepository.find();
    }
    return this.ormRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);
    const existsProducts = await this.find(productsIds);
    return existsProducts;
  }
}
