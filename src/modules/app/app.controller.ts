import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from "src/modules/app/app.service";
import { ScrapPageQueryDTO } from 'src/dto/scrap-page-query.dto';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.setHello()
  }

  @Get('/help')
  getHelp(): string {
    return this.appService.pleaseHelp()
  }

  @Get('/scrap')
  getScrapper(@Query() params: ScrapPageQueryDTO): Promise<object>  {
    return this.appService.scrapPage(params)
  }
}
