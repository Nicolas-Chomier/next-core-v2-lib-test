'use client';
// React core
import React from 'react';
// External modules / Third-party libraries
import { nanoid } from 'nanoid';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
// Local components
import { DatePicker } from '@/Library/DatePicker/DatePicker';
import { FormButton } from '@/Library/FormButton/FormButton';
import { SearchBar } from '@/Library/SearchBar/SearchBar';
import { InputString } from '@/Library/InputString/InputString';
import { InputNumber } from '@/Library/inputNumber/InputNumber';
import { SelectMultiple } from '@/Library/SelectMultiple/SelectMultiple';
// Hooks and utilities
import { Controller, useForm } from 'react-hook-form';
// Configuration
import styles from './LandingPage.module.css';

const generateRandomIds = (count: number, length: number) =>
	Array.from({ length: count }, () => nanoid(length));

const randomIds = generateRandomIds(50, 5);

const regexString = /[^a-zA-Z0-9@.]/g;

type TTestingForm = {
	dateRange: [Date, Date];
	searchBar: string;
	//myText: string;
	//myNumber: number;
	multiple: string[];
};

const TestSchema: ZodType<TTestingForm> = z.object({
	dateRange: z.tuple([z.date(), z.date()]),
	searchBar: z.string().toLowerCase().trim().min(1),
	//myText: z.string().toLowerCase().trim().min(8),
	//myNumber: z.number().finite().safe().min(-20).max(20),
	multiple: z.array(z.string().toLowerCase().trim().min(1)).nonempty(),
});

const LandingPage = () => {
	const {
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

	console.log(errors);

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
						limitDateMax={10}
						placeholder='JJ/MM/AAAA'
						isSubmit={isSubmitting}
						isValid={isValid}
						disabled={false}
						onFieldChange={onChange}
						size='standard'
						className='testDatePicker'
					></DatePicker>
				)}
			/>

			{/* ############################################## */}
			{/* ############################################## */}

			{/* <Controller
				control={control}
				name='searchBar'
				render={({ field: { onChange } }) => (
					<SearchBar
						data={randomIds}
						size={31}
						placeholder='Search'
						overSizeLimit={999}
						isSubmit={isSubmitting}
						isValid={isValid}
						disabled={false}
						onFieldChange={onChange}
					></SearchBar>
				)}
			/> */}

			{/* ############################################## */}
			{/* ############################################## */}

			{/* <Controller
				control={control}
				name='myText'
				render={({ field: { onChange } }) => (
					<InputString
						type={'text'}
						regex={regexString}
						placeholder='My text here!'
						errors={errors['myText']?.message}
						size={16}
						isSubmit={isSubmitting}
						isValid={isValid}
						disabled={false}
						onFieldChange={onChange}
					></InputString>
				)}
			/> */}

			{/* ############################################## */}
			{/* ############################################## */}

			{/* <Controller
				control={control}
				name='myNumber'
				render={({ field: { onChange } }) => (
					<InputNumber
						placeholder='My number here!'
						errors={errors['myNumber']?.message}
						step='0.1'
						min='-20'
						max='20'
						outputNumber={true}
						isSubmit={isSubmitting}
						isValid={isValid}
						disabled={false}
						onFieldChange={onChange}
					></InputNumber>
				)}
			/> */}

			{/* ############################################## */}
			{/* ############################################## */}

			<Controller
				control={control}
				name='multiple'
				render={({ field: { onChange } }) => (
					<SelectMultiple
						data={randomIds}
						placeholder='Multiple'
						size={31}
						overSizeLimit={999}
						isSubmit={isSubmitting}
						isValid={isValid}
						disabled={false}
						onFieldChange={onChange}
					></SelectMultiple>
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
