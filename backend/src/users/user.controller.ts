import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    try {
      return await this.userService.create(email, password);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw new Error('Error al registrar el usuario'); // Puedes lanzar un error más descriptivo si es necesario
    }
  }
  
}
