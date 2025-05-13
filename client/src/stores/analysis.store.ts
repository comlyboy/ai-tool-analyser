import { create } from "zustand";
import { ApplicationNamesType } from "../types";
import { useNotificationStore } from "./notification.store";
import { sendHttpRequest } from "../http";
import { IBaseErrorObject } from "../interface/base.interface";

interface IThemeStore {
	analysis: Record<string, any> | null;
	isLoading: boolean,
	error: IBaseErrorObject | null,
	createAnalysis: (analysisDto: {
		applicationName: ApplicationNamesType;
		yearlyExpense: number;
		isRawPrompt?: boolean;
		monthlyExpense: number;
		rawPromptMessage?: string;
	}) => Promise<void>;
}


export const useAnalysisStore = create<IThemeStore>((set) => ({
	analysis: null,
	isLoading: false,
	error: null,
	createAnalysis: async (analysisDto) => {
		try {
			set({ isLoading: true });
			const { data, message } = await sendHttpRequest<any>({
				url: '/analysis',
				method: 'post',
				data: { ...analysisDto }
			});
			useNotificationStore.getState().sendAlert(message);
			set({ analysis: data.analysis });
		} catch (error) {
			console.log('error', error);
			useNotificationStore.getState().sendErrorAlert(error);
			set({ analysis: null });
		} finally {
			set({ isLoading: false });
		}
	}
}));