import { container } from 'tsyringe';

import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';

//Para manter uma única instância da Classe CustomersRepository durante o ciclo de vida da Aplicação
container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductRepository,
);
