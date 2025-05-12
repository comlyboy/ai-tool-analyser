import { modelIds } from "src/constants";

export enum ApplicationNamesEnum {
	GOTO_CONNECT = 'goto-connect',
	ALICE = 'alice',
	SLACK = 'slack',
	GOOGLE_WORKSPACE = 'google-workspace',
	ASANA = 'asana',
	ZOOM = 'zoom',
	WEBEX = 'webex',
	MICROSOFT_TEAMS = 'ms-teams',
	YAY = 'yay'
}
export type ApplicationNamesType = `${ApplicationNamesEnum}`;

export type BedrockModelIdType = typeof modelIds[number];
