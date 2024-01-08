'use client';
// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
import { DatePicker } from '@/Library/DatePicker/DatePicker';
// Hooks and utilities
import { Controller, useForm } from 'react-hook-form';
// Configuration
import styles from './LandingPage.module.css';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { FormButton } from '@/Library/FormButton/FormButton';
import { SearchBar } from '@/Library/SearchBar/SearchBar';
import { nanoid } from 'nanoid';
import { InputString } from '@/Library/InputString/InputString';

const generateRandomIds = (count: number, length: number) =>
	Array.from({ length: count }, () => nanoid(length));

const randomIds = generateRandomIds(100, 5);

type TTestingForm = {
	myText: string;
	dateRange: [Date, Date];
	searchBar: string;
};

const TestSchema: ZodType<TTestingForm> = z.object({
	// largeList: z.string().toLowerCase().trim().min(1),
	// multiple: z.array(z.string()),
	myText: z.string().toLowerCase().trim().min(8),
	//email: z.string().email().min(4, 'Email to short').max(90, 'Email to long'),
	dateRange: z.tuple([z.date(), z.date()]),
	searchBar: z.string().toLowerCase().trim().min(1),
});

const LandingPage = () => {
	const {
		/* setValue,
		register, */
		handleSubmit,
		reset,
		control,
		formState: { isValid, isSubmitting, errors },
	} = useForm<TTestingForm>({
		mode: 'onChange',
		resolver: zodResolver(TestSchema),
	});

	const submitData = async (data: TTestingForm) => {
		console.log('====>', data);
		reset();
	};

	console.log(isSubmitting);

	return (
		<form onSubmit={handleSubmit(submitData)} className={styles.container}>
			{/* ############################################## */}
			{/* ############################################## */}

			<Controller
				control={control}
				name='dateRange'
				render={({ field: { onChange } }) => (
					<DatePicker
						limitDateMin={-10}
						limitDateMax={5}
						placeholder='JJ/MM/AAAA'
						isSubmit={isSubmitting}
						isValid={isValid}
						disabled={false}
						onFieldChange={onChange}
					></DatePicker>
				)}
			/>

			{/* ############################################## */}
			{/* ############################################## */}

			<Controller
				control={control}
				name='searchBar'
				render={({ field: { onChange } }) => (
					<SearchBar
						data={randomIds}
						placeholder='Nicolas'
						size={28}
						isSubmit={isSubmitting}
						isValid={isValid}
						overSizeLimit={999}
						disabled={false}
						onFieldChange={onChange}
					></SearchBar>
				)}
			/>

			{/* ############################################## */}
			{/* ############################################## */}

			<Controller
				control={control}
				name='myText'
				render={({ field: { onChange } }) => (
					<InputString
						type={'text'}
						placeholder='Input String Text'
						size={30}
						isSubmit={isSubmitting}
						isValid={isValid}
						disabled={false}
						errors={errors['myText']?.message}
						onFieldChange={onChange}
					></InputString>
				)}
			/>

			{/* ############################################## */}
			{/* ############################################## */}

			<FormButton
				isValid={isValid}
				isSubmit={isSubmitting}
				disabled={false}
				placeholder={'Validation'}
			></FormButton>
		</form>
	);
};
export default LandingPage;
