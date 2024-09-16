import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Unique identifier of the employee (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    description: 'First name of the employee',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the employee',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Position of the employee',
    example: 'Developer',
  })
  @IsString()
  position: string;

  @ApiProperty({
    description: 'Phone number of the employee',
    example: '1234567890',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Email address of the employee',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;
}
