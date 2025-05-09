import { Controller, Inject, Post, Res } from '@nestjs/common';

import { AnalyseService } from './analyse.service';
import { Response } from 'express';

@Controller('analyse')
export class AnalyseController {

	@Inject() private readonly analyseService: AnalyseService;

	@Post()
	async analyse(
		@Res() res: Response,
	) {
		const data = await this.analyseService.analyse();
		return res.status(201).json({ statusCode: 201, data });
	}

}
