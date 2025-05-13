import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { BedrockService } from 'src/common/bedrock/bedrock.service';
import { CreateAnalysisDto } from './dto/analysis.dto';

@Injectable()
export class AnalysisService {

	@Inject() private readonly bedrockService: BedrockService;

	async analyse(createAnalysisDto: CreateAnalysisDto) {
		if (createAnalysisDto) {
			throw new UnauthorizedException('Not processible!')
		}
		const context = await this.bedrockService.generateContext(createAnalysisDto);
		return await this.bedrockService.invokeModel(context, 'anthropic.claude-3-5-sonnet-20241022-v2:0');
	}

}
