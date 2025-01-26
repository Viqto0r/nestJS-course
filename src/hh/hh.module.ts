import { HttpModule, Module } from '@nestjs/common';
import { HhService } from './hh.service';
import { TopPageModule } from 'src/top-page/top-page.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [HhService],
  exports: [HhService],
})
export class HhModule {}
