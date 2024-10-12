import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users') // <- Este es el prefijo de ruta
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register') // <- Esta es la ruta POST para /users/register
  async register(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    try {
      return await this.userService.create(email, password);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw new Error('Error al registrar el usuario'); 
    }
  }
}
