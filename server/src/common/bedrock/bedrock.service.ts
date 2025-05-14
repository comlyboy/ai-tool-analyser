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
					role: 'user',
					// content: { type: 'text', context },
					content: [
						{
							type: 'text',
							text: context
						}
					]
				}],

				// Alternative to temperature
				top_p: 0.8,

				// Controls randomness
				temperature: 0.7,

				// Controls output length
				max_tokens: 2000,

				// Must be "bedrock-2023-05-31"
				anthropic_version: 'bedrock-2023-05-31'
			})
		}));

		const output = new TextDecoder().decode(response.body);
		const result = JSON.parse(output) as Record<string, any>;

		return {
			id: result.id,
			type: result.type,
			role: result.role,
			usage: result.usage,
			model: result.model,
			responses: (result.content as any[]).map(message => message.text)
		};
	}


	async generateContext(createAnalysisDto: CreateAnalysisDto) {

		const features = createAnalysisDto.applicationFeatures.map(feature => `- ${feature}`).join("\n");

		return `
			We are currently using ${createAnalysisDto.applicationName} for internal team tool.

			Here are the key details of our current setup:

			**Tool**: ${createAnalysisDto.applicationName}

			**Key Features**:
			${features}

			**Pricing**:
			- $${createAnalysisDto.monthlyExpense.toFixed(2)} for ${createAnalysisDto.userCount} users per month.
			- $${createAnalysisDto.annualExpense.toFixed(2)} for ${createAnalysisDto.userCount} users annually.

			**Team Size Under Review**: upto ${createAnalysisDto.userCount} users

			**Goal**:
			Evaluate whether there are **better-value alternatives** to ${createAnalysisDto.applicationName} that provide **comparable or superior features**, **lower cost**, or **improved usability**, especially for the team sizes mentioned.

			---

			**What You Should Do**:

			1. Identify potential alternatives to ${createAnalysisDto.applicationName} available in ${new Date().toDateString()}.
			2. For each suggested alternative:
				- Summarise key features that overlap or improve upon ${createAnalysisDto.applicationName}
				- Compare pricing (monthly & annual) for team sizes of ${createAnalysisDto.userCount}
				- Note feature gaps or advantages
			3. Analyse overall cost differences and value-for-money for each alternative.
			4. Recommend whether it's worth switching from ${createAnalysisDto.applicationName} based on:
				- Team size
				- Cost efficiency
				- Feature parity
				- Strategic or operational benefits

			Avoid guessing unknown tools — only include alternatives with reliable public information as of ${new Date().toDateString()}.
			Be specific, concise, and base all assessments on current ${new Date().toDateString()} pricing and product capabilities.
		`;
	}

}
