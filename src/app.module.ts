import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { NhanVienModule } from './nhanvien/nhanvien.module';
import { LopModule } from './lop/lop.module';
import { SinhvienModule } from './sinhvien/sinhvien.module';
import { HocphanModule } from './hocphan/hocphan.module';
import { BangdiemModule } from './bangdiem/bangdiem.module';

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
    AuthModule,
    NhanVienModule,
    LopModule,
    SinhvienModule,
    HocphanModule,
    BangdiemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
