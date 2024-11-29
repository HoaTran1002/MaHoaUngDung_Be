import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudyModule } from './study/study.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { NhanVienModule } from './nhanvien/nhanvien.module';
import { LopModule } from './lop/lop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ds8O80>^)9FN',
      database: 'QLSVNhom',
      autoLoadEntities: true,
      synchronize: true,
    }),
    StudyModule,
    AuthModule,
    NhanVienModule,
    LopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
