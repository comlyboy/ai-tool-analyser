import { Controller, Inject, Post, Res } from '@nestjs/common';

import { AnalysisService } from './analysis.service';
import { Response } from 'express';

@Controller('analysis')
export class AnalysisController {

	@Inject() private readonly analysisService: AnalysisService;

	@Post()
	async analyse(
		@Res() res: Response,
	) {
		const data = await this.analysisService.analyse();
		return res.status(201).json({ statusCode: 201, data });
	}

}
