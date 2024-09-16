import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async bulkCreateOrUpdate(
    employees: CreateEmployeeDto[],
  ): Promise<Employee[]> {
    const result: Employee[] = [];

    for (const employeeDto of employees) {
      const { id, ...employeeData } = employeeDto;
      let employee: Employee;

      if (id) {
        employee = await this.employeeRepository.findOne({ where: { id } });
        if (employee) {
          this.employeeRepository.merge(employee, employeeData);
        } else {
          throw new Error(`Employee with ID ${id} not found`);
        }
      } else {
        employee = this.employeeRepository.create(employeeData);
      }

      result.push(await this.employeeRepository.save(employee));
    }

    return result;
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }
}
