import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import { injectable, inject } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(id: string): Promise<Order> {
    const ordersRepository = this.ordersRepository;

    const order = await ordersRepository.findById(id);
    if (!order) {
      throw new AppError('Order not Found!');
    }
    return order;
  }
}

export default ShowOrderService;
