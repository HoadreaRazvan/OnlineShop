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
  async register(@Body() body: { email: string; password: string }) {
    try {
      const newUser = await this.userService.createUser(body.email, body.password, false);
      return { success: true, user: newUser };
    } catch (error) {
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }
  
}
