import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/User.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: Record<string, any>) {
    return this.userService.signIn(signInDto.username, signInDto.password);
  }

  @Post()
  create(@Body() user): Promise<User> {
    return this.userService.create(user);
  }

  @Get('profile')
  profile(@Req() req, @Res() res) {
    console.log(req);
    return res.status(HttpStatus.OK).json(req.user);
  }
}
