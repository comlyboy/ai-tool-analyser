import { Body, Controller, Inject, Post, Res } from '@nestjs/common';

import { AnalysisService } from './analysis.service';
import { Response } from 'express';
import { CreateAnalysisDto } from './dto/analysis.dto';

@Controller('analysis')
export class AnalysisController {

	@Inject() private readonly analysisService: AnalysisService;

	@Post()
	async analyse(
		@Res() res: Response,
		@Body() createAnalysisDto: CreateAnalysisDto
	) {
		const data = await this.analysisService.analyse(createAnalysisDto);
		return res.status(201).json({ statusCode: 201, data });
	}

}
