import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IOrder } from '../domain/models/IOrder';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(id: string): Promise<IOrder> {
    const ordersRepository = this.ordersRepository;

    const order = await ordersRepository.findById(id);
    if (!order) {
      throw new AppError('Order not Found!');
    }
    return order;
  }
}

export default ShowOrderService;
