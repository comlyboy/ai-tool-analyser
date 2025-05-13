import { Inject, Injectable } from '@nestjs/common';

import { BedrockService } from 'src/common/bedrock/bedrock.service';

@Injectable()
export class AnalysisService {

	@Inject() private readonly bedrockService: BedrockService;

	async analyse() {
		return await this.bedrockService.invokeModel('', 'anthropic.claude-3-5-sonnet-20241022-v2:0');
	}

}
