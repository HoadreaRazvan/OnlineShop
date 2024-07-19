import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: { email: string; password: string; admin: boolean }) {
    if (!body.email || !body.password) {
      throw new HttpException('Missing email or password', HttpStatus.BAD_REQUEST);
    }
    return this.userService.createUser(body.email, body.password, body.admin);
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('login/admin')
  async loginAdmin(@Body() body: { email: string; password: string }) {
    const user = await this.userService.findUserByEmail(body.email);
    console.log('User:', user);
    if (user && user.password === body.password && user.admin==true) {
      return { success: true };
    } else {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('login/client')
  async loginClient(@Body() body: { email: string; password: string }) {
    const user = await this.userService.findUserByEmail(body.email);
    if (user && user.password === body.password && user.admin==false) {
      return { success: true };
    } else {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('register')
  async createNewUser(@Body() body: { email: string; password: string; admin: boolean }) {
    try {
      return await this.userService.createUser(body.email, body.password, body.admin);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('update')
  async updateUser(@Body() body: { id: string; newEmail?: string; newPassword?: string; newAdmin?: boolean }) {
    try {
      return await this.userService.updateUser(body.id, body.newEmail, body.newPassword, body.newAdmin);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('delete')
  async deleteUser(@Body() body: { id: string }) {
    try {
      return await this.userService.deleteUser(body.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
}
