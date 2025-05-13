import { Injectable } from '@nestjs/common';

import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

import { BedrockModelIdType } from 'src/types';
import { CreateAnalysisDto } from 'src/core/analysis/dto/analysis.dto';

@Injectable()
export class BedrockService {

	private readonly bedrockClient = new BedrockRuntimeClient();

	async invokeModel(context: string, modelId?: BedrockModelIdType) {
		const response = await this.bedrockClient.send(new InvokeModelCommand({
			modelId: modelId || 'anthropic.claude-3-5-sonnet-20241022-v2:0',
			contentType: "application/json",
			accept: "application/json",
			body: JSON.stringify({
				messages: [{
					role: "user",
					content: context
				}],

				// Alternative to temperature
				top_p: 0.8,

				// Controls randomness
				temperature: 0.7,

				// Controls output length
				max_tokens: 2048,

				// Must be "bedrock-2023-05-31"
				anthropic_version: 'bedrock-2023-05-31'
			})
		}));

		const output = new TextDecoder().decode(response.body);
		return JSON.parse(output) as Record<string, any>;
	}


	async generateContext(createAnalysisDto: CreateAnalysisDto) {

		return '';
	}

}
