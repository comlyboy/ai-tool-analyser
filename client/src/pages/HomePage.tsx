import { useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import PageLayout from "../components/layouts/PageLayout";
import ModalLayout from "../components/layouts/ModalLayout";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import TextareaInput from "../components/TextareaInput";
import SelectInput from "../components/SelectInput";
import { ApplicationNamesEnum, ApplicationNamesType } from "../types";
import { toTitleCase } from "../utility";
import { useAnalysisStore } from "../stores";
import NotificationComponent from "../components/NotificationComponent";

export default function HomePage() {

	const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

	const { analysis, createAnalysis } = useAnalysisStore()

	const promptFormGroup = useForm<{
		applicationName: ApplicationNamesType;
		yearlyExpense: number;
		isRawPrompt?: boolean;
		monthlyExpense: number;
		rawPromptMessage?: string;
	}>({
		mode: 'onChange',
		defaultValues: { isRawPrompt: false }
	});

	const watchPrompt = promptFormGroup.watch('isRawPrompt')!;

	async function onSubmit() {
		await createAnalysis(promptFormGroup.getValues())
	}

	return <>
		<NotificationComponent />
		<HeaderComponent />
		<PageLayout className="pt-20 pb-6 px-4 md:px-6 container mx-auto">
			<div className="flex justify-end mb-4">
				<button type="button" onClick={() => setModalIsOpened(true)} className="bg-blue-500 text-white px-8 py-2 rounded-lg cursor-pointer">New Analysis</button>
			</div>

			<div className="border border-slate-300 rounded-lg p-3 bg-white">

				{!analysis && <div className="py-6">
					<p className="text-center">No analysis done yet. <span onClick={() => setModalIsOpened(true)} className="text-blue-500 hover:underline cursor-pointer">Create new</span> </p>
				</div>}

			</div>
		</PageLayout>


		<ModalLayout parameters={{
			isOpened: modalIsOpened,
			title: 'Submit Prompt for AI Analysis',
			subTitle: 'Provide a detailed prompt for analysis using AWS Bedrock\'s foundation models'
		}} modalResult={() => setModalIsOpened(false)}>
			<form onSubmit={promptFormGroup.handleSubmit(onSubmit)}>

				<SelectInput name="applicationName" label="Application name" placeholder="Select application..." required control={promptFormGroup.control} options={Object.values(ApplicationNamesEnum).map(appName => {
					return {
						label: toTitleCase(appName.replace('-', ' ')),
						value: appName
					}
				})} rules={{ required: true }} />

				<div className="flex items-center gap-3">
					<div className="w-1/2">
						<TextInput options={{
							name: 'monthlyExpense',
							type: 'number',
							required: true,
							disabled: watchPrompt,
							label: 'Monthly expense',
							placeholder: 'Monthly expense...'
						}} control={promptFormGroup.control} rules={{ required: true }} />
					</div>
					<div className="w-1/2">
						<TextInput options={{
							name: 'yearlyExpense',
							type: 'number',
							required: true,
							disabled: watchPrompt,
							label: 'Yearly expense',
							placeholder: 'Yearly expense...'
						}} control={promptFormGroup.control} rules={{ required: true }} />
					</div>
				</div>

				<label className="inline-flex items-center space-x-2 cursor-pointer mb-6">
					<input type="checkbox" {...promptFormGroup.register("isRawPrompt")}
						className="peer hidden" />
					<div className="w-4 h-4 rounded border-2 border-slate-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 flex items-center justify-center">
						<svg className="hidden w-3 h-3 text-white peer-checked:block" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
							<path d="M5 13l4 4L19 7" />
						</svg>
					</div>
					<span>Use raw prompt</span>
				</label>

				<TextareaInput options={{
					name: 'rawPrompt',
					placeholder: 'Raw prompt message...',
					label: 'Raw prompt message',
					required: true,
					disabled: !watchPrompt,
				}} control={promptFormGroup.control} rules={{ required: true }} />

				<button type="submit" className="bg-blue-500 text-white w-full px-6 py-2.5 rounded-lg cursor-pointer text-base">Submit</button>
			</form>
		</ModalLayout>
	</>
}
