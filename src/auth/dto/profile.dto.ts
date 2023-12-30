import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Role } from '../interface/role';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;
  @IsNotEmpty()
  @IsString()
  readonly userUUID: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly role: Role;
}
