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

  async createUser(email: string, password: string, admin: boolean): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password,
          admin,
        },
      });
      console.log('User created:', user);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
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
  
}
