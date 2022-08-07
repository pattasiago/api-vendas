import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

interface IfindOne {
  relations: string[];
}

export class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public create({ customer, order_products }: ICreateOrder): Order {
    const order = this.ormRepository.create({ customer, order_products });
    return order;
  }

  public async save(order: Order): Promise<Order> {
    return this.ormRepository.save(order);
  }

  public async findOne(
    id: string,
    param: IfindOne,
  ): Promise<Order | undefined> {
    const customer = this.ormRepository.findOne(id, param);
    return customer;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['order_products', 'customer'],
    });
    return order;
  }

  public async createOrder({
    customer,
    order_products,
  }: ICreateOrder): Promise<Order> {
    const order = this.create({
      customer: customer,
      order_products: order_products,
    });
    await this.save(order);
    return order;
  }
}
