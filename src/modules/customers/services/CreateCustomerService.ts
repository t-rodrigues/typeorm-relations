import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: ICreateCustomerDTO): Promise<Customer> {
    const findCustomer = await this.customersRepository.findByEmail(email);

    if (findCustomer) {
      throw new AppError('E-mail already registered');
    }

    const customer = await this.customersRepository.create({ email, name });

    return customer;
  }
}

export default CreateCustomerService;
