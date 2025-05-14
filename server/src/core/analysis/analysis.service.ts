import { Inject, Injectable } from '@nestjs/common';

import { BedrockService } from 'src/common/bedrock/bedrock.service';
import { CreateAnalysisDto } from './dto/analysis.dto';

@Injectable()
export class AnalysisService {

	@Inject() private readonly bedrockService: BedrockService;

	async analyse(createAnalysisDto: CreateAnalysisDto) {
		const context = await this.bedrockService.generateContext(createAnalysisDto);
		const analysis = await this.bedrockService.invokeModel(context, 'anthropic.claude-3-5-sonnet-20240620-v1:0');
		return { analysis };
	}

}
