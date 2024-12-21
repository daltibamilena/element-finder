import { Module } from '@nestjs/common';
import { AppController } from 'src/modules/app/app.controller';
import { AppService } from 'src/modules/app/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
