import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalysisModule } from './core/analysis';
import { BedrockModule } from './common/bedrock';

@Module({
	imports: [AnalysisModule, BedrockModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule { }
