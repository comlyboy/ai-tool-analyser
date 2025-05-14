import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, Min, ValidateIf } from "class-validator";
import { ApplicationNamesEnum, ApplicationNamesType } from "src/types";

export class CreateAnalysisDto {

	@IsString()
	@IsNotEmpty()
	@IsEnum(ApplicationNamesEnum)
	applicationName: ApplicationNamesType;

	@ValidateIf(value => !value.isRawPrompt)
	@IsArray()
	@IsString({ each: true })
	@IsNotEmpty()
	applicationFeatures: string[]

	@IsBoolean()
	@IsNotEmpty()
	isRawPrompt: boolean;

	@ValidateIf(value => !value.isRawPrompt)
	@IsNumber()
	@Min(1)
	@IsNotEmpty()
	monthlyExpense: number;

	@ValidateIf(value => !value.isRawPrompt)
	@IsNumber()
	@Min(1)
	@IsNotEmpty()
	userCount: number;

	@ValidateIf(value => !value.isRawPrompt)
	@IsNumber()
	@Min(1)
	@IsNotEmpty()
	annualExpense: number;

	@ValidateIf(value => value.isRawPrompt)
	@IsString()
	@IsNotEmpty()
	rawPromptMessage?: string;

}