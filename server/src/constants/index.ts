import { NotFoundException } from "@nestjs/common";

import { ApplicationNamesEnum, ApplicationNamesType } from "src/types";

export const modelIds = [
	'amazon.titan-tg1-large',
	'amazon.titan-image-generator-v1:0',
	'amazon.titan-image-generator-v1',
	'amazon.titan-image-generator-v2:0',
	'amazon.nova-premier-v1:0:8k',
	'amazon.nova-premier-v1:0:20k',
	'amazon.nova-premier-v1:0:1000k',
	'amazon.nova-premier-v1:0:mm',
	'amazon.nova-premier-v1:0',
	'amazon.titan-text-premier-v1:0',
	'amazon.nova-pro-v1:0:24k',
	'amazon.nova-pro-v1:0:300k',
	'amazon.nova-pro-v1:0',
	'amazon.nova-lite-v1:0:24k',
	'amazon.nova-lite-v1:0:300k',
	'amazon.nova-lite-v1:0',
	'amazon.nova-canvas-v1:0',
	'amazon.nova-reel-v1:0',
	'amazon.nova-reel-v1:1',
	'amazon.nova-micro-v1:0:24k',
	'amazon.nova-micro-v1:0:128k',
	'amazon.nova-micro-v1:0',
	'amazon.nova-sonic-v1:0',
	'amazon.titan-embed-g1-text-02',
	'amazon.titan-text-lite-v1:0:4k',
	'amazon.titan-text-lite-v1',
	'amazon.titan-text-express-v1:0:8k',
	'amazon.titan-text-express-v1',
	'amazon.titan-embed-text-v1:2:8k',
	'amazon.titan-embed-text-v1',
	'amazon.titan-embed-text-v2:0:8k',
	'amazon.titan-embed-text-v2:0',
	'amazon.titan-embed-image-v1:0',
	'amazon.titan-embed-image-v1',
	'stability.stable-diffusion-xl-v1:0',
	'stability.stable-diffusion-xl-v1',
	'ai21.jamba-instruct-v1:0',
	'ai21.jamba-1-5-large-v1:0',
	'ai21.jamba-1-5-mini-v1:0',
	'anthropic.claude-instant-v1:2:100k',
	'anthropic.claude-instant-v1',
	'anthropic.claude-v2:0:18k',
	'anthropic.claude-v2:0:100k',
	'anthropic.claude-v2:1:18k',
	'anthropic.claude-v2:1:200k',
	'anthropic.claude-v2:1',
	'anthropic.claude-v2',
	'anthropic.claude-3-sonnet-20240229-v1:0:28k',
	'anthropic.claude-3-sonnet-20240229-v1:0:200k',
	'anthropic.claude-3-sonnet-20240229-v1:0',
	'anthropic.claude-3-haiku-20240307-v1:0:48k',
	'anthropic.claude-3-haiku-20240307-v1:0:200k',
	'anthropic.claude-3-haiku-20240307-v1:0',
	'anthropic.claude-3-opus-20240229-v1:0:12k',
	'anthropic.claude-3-opus-20240229-v1:0:28k',
	'anthropic.claude-3-opus-20240229-v1:0:200k',
	'anthropic.claude-3-opus-20240229-v1:0',
	'anthropic.claude-3-5-sonnet-20240620-v1:0',
	'anthropic.claude-3-5-sonnet-20241022-v2:0',
	'anthropic.claude-3-7-sonnet-20250219-v1:0',
	'anthropic.claude-3-5-haiku-20241022-v1:0',
	'cohere.command-text-v14:7:4k',
	'cohere.command-text-v14',
	'cohere.command-r-v1:0',
	'cohere.command-r-plus-v1:0',
	'cohere.command-light-text-v14:7:4k',
	'cohere.command-light-text-v14',
	'cohere.embed-english-v3:0:512',
	'cohere.embed-english-v3',
	'cohere.embed-multilingual-v3:0:512',
	'cohere.embed-multilingual-v3',
	'deepseek.r1-v1:0',
	'meta.llama3-8b-instruct-v1:0',
	'meta.llama3-70b-instruct-v1:0',
	'meta.llama3-1-8b-instruct-v1:0',
	'meta.llama3-1-70b-instruct-v1:0',
	'meta.llama3-2-11b-instruct-v1:0',
	'meta.llama3-2-90b-instruct-v1:0',
	'meta.llama3-2-1b-instruct-v1:0',
	'meta.llama3-2-3b-instruct-v1:0',
	'meta.llama3-3-70b-instruct-v1:0',
	'meta.llama4-scout-17b-instruct-v1:0:128k',
	'meta.llama4-scout-17b-instruct-v1:0:10m',
	'meta.llama4-scout-17b-instruct-v1:0',
	'meta.llama4-maverick-17b-instruct-v1:0:128k',
	'meta.llama4-maverick-17b-instruct-v1:0:1m',
	'meta.llama4-maverick-17b-instruct-v1:0',
	'mistral.mistral-7b-instruct-v0:2',
	'mistral.mixtral-8x7b-instruct-v0:1',
	'mistral.mistral-large-2402-v1:0',
	'mistral.mistral-small-2402-v1:0',
	'mistral.pixtral-large-2502-v1:0'
] as const



/** Build context for applications. */
export function getContext(appName: ApplicationNamesType) {
	if (appName === ApplicationNamesEnum.GOTO_CONNECT) {
		return '';
	} else if (appName === ApplicationNamesEnum.ALICE) {
		return '';
	} else if (appName === ApplicationNamesEnum.ASANA) {
		return '';
	} else if (appName === ApplicationNamesEnum.GOOGLE_WORKSPACE) {
		return '';
	} else if (appName === ApplicationNamesEnum.MICROSOFT_TEAMS) {
		return '';
	} else if (appName === ApplicationNamesEnum.SLACK) {
		return '';
	} else if (appName === ApplicationNamesEnum.WEBEX) {
		return '';
	} else if (appName === ApplicationNamesEnum.ZOOM) {
		return '';
	} else if (appName === ApplicationNamesEnum.YAY) {
		return '';
	} else {
		throw new NotFoundException('Selected application not found')
	}

}