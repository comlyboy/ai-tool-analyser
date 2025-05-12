import { Module } from '@nestjs/common';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BedrockModule } from './common/bedrock/bedrock.module';
import { AnalyseModule } from './core/analyse/analyse.module';

@Module({
  imports: [BedrockModule, AnalyseModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
