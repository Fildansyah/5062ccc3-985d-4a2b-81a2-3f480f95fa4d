import { Body, Controller, Post, Get } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Employee } from '../entities/employee.entity';
import {
  getEmployeeExample,
  manageEmployeeExample,
} from 'src/utils/employee.utils';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({
    status: 200,
    description: 'Fetch all employees successfully',
    type: [Employee],
    example: {
      'application/json': getEmployeeExample,
    },
  })
  findAll() {
    return this.employeeService.findAll();
  }

  @Post('manage')
  @ApiOperation({ summary: 'Bulk create or update employees' })
  @ApiResponse({
    status: 201,
    description: 'Bulk employee creation or update successful',
    type: [Employee],
    example: {
      'application/json': manageEmployeeExample,
    },
  })
  bulkCreateOrUpdate(@Body() employees: CreateEmployeeDto[]) {
    return this.employeeService.bulkCreateOrUpdate(employees);
  }
}
