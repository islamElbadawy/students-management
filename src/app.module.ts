import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    StudentsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      url: process.env.DATABASE_URL,
      port: 5432,
      username: 'islam',
      password: process.env.DATABASE_PASSWORD,
      database: 'sms_uozd',
      autoLoadEntities: true,
      synchronize: false,
      logging: true, // Set to false in production to disable query logging
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Specify the path to your entities
      migrations: [__dirname + '/migrations/*{.ts,.js}'], // Specify the path to your migrations
      migrationsRun: true,
    }),
    AuthModule,
    PassportModule,
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1h' } }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
