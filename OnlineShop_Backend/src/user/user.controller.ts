import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
    async createUser(@Body() body: { email: string; password: string }) {
        if (!body.email || !body.password) {
        throw new HttpException('Missing email or password', HttpStatus.BAD_REQUEST);
        }
        return this.userService.createUser(body.email, body.password);
    }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }
}
