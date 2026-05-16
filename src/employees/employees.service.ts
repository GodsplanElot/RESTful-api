import { Injectable } from '@nestjs/common';
import type { Prisma } from '../../generated/prisma/client.ts';
import { DatabaseService } from '../database/database.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';


@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    // map DTO to Prisma input if needed (shallow copy works here)
    const data: Prisma.EmployeeCreateInput = { ...createEmployeeDto };
    return this.databaseService.employee.create({ data });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) return this.databaseService.employee.findMany({
      where: {
        role,
      }
    })
    return this.databaseService.employee.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: {
        id,
      }
    })
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const data: Prisma.EmployeeUpdateInput = { ...updateEmployeeDto } as Prisma.EmployeeUpdateInput;
    return this.databaseService.employee.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      }
    })
  }
}
