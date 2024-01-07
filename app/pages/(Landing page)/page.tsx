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
import { FormButton } from '@/app/components/shared/buttons/FormButton';
import { SearchBar } from '@/Library/SearchBar/SearchBar';
import { nanoid } from 'nanoid';

const generateRandomIds = (count: number, length: number) =>
	Array.from({ length: count }, () => nanoid(length));

const randomIds = generateRandomIds(500, 3);

type TTestingForm = {
	dateRange: [Date, Date];
	searchBar: string;
};

const TestSchema: ZodType<TTestingForm> = z.object({
	/*  largeList: z.string().toLowerCase().trim().min(1),
    multiple: z.array(z.string()),
    basic: z.string().toLowerCase().trim().min(1),
	email: z.string().email().min(4, 'Email to short').max(90, 'Email to long'), */
	dateRange: z.tuple([z.date(), z.date()]),
	searchBar: z.string().toLowerCase().trim(),
});

const LandingPage = () => {
	const {
		handleSubmit,
		reset,
		control,
		formState: { isValid, isLoading, isSubmitting },
	} = useForm<TTestingForm>({
		mode: 'onChange',
		resolver: zodResolver(TestSchema),
	});

	const submitData = async (data: TTestingForm) => {
		console.log('====>', data);
		reset();
	};

	console.log(isValid);
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
						onFieldChange={onChange}
					></SearchBar>
				)}
			/>

			{/* ############################################## */}
			{/* ############################################## */}

			<FormButton display={isValid} isLoading={isLoading}></FormButton>
		</form>
	);
};
export default LandingPage;
