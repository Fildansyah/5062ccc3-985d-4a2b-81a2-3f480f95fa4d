import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Employee } from 'src/entities/employee.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async seedEmployees() {
    const employeeCount = await this.employeeRepository.count();
    if (employeeCount > 0) {
      console.log('Employees already seeded');
      return;
    }

    const employees = [];
    for (let i = 0; i < 10; i++) {
      const employee = new Employee();
      employee.firstName = faker.person.firstName();
      employee.lastName = faker.person.lastName();
      employee.position = faker.person.jobTitle();
      employee.phone = faker.phone.number();
      employee.email = faker.internet.email();

      employees.push(employee);
    }

    await this.employeeRepository.save(employees);
    console.log('Seeded Employees');
  }
}
