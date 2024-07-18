import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }


  async getUsers(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany();
      console.log('Fetched users:', users);
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

 async createUser(email: string, password: string, admin: boolean): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          email,
          password,
          admin,
        },
      });
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async updateUser(id: string, newEmail?: string, newPassword?: string, newAdmin?: boolean): Promise<User> {
    try {
      const data: any = {};
      if (newEmail) data.email = newEmail;
      if (newPassword) data.password = newPassword;
      if (newAdmin !== undefined) data.admin = newAdmin;

      return await this.prisma.user.update({
        where: { id: id },
        data,
      });
    } catch (error) {
      throw new Error(`Failed to update user with id ${id}: ${error.message}`);
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new Error(`Failed to delete user with id ${id}: ${error.message}`);
    }
  }
  
}
