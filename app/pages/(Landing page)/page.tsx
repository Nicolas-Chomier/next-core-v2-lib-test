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
import { InputNumber } from '@/Library/InputNumber/InputNumber';
import { SelectMultiple } from '@/Library/SelectMultiple/SelectMultiple';
// Hooks and utilities
import { Controller, useForm } from 'react-hook-form';
import { useBoundStore } from '@/app/store/useBoundStore';
// Configuration & styles
import './LandingPage.css';
import { CustomizableButton } from '@/Library/CustomizableButton';
import { Moon, Sun } from 'lucide-react';

const generateRandomIds = (count: number, length: number) =>
	Array.from({ length: count }, () => nanoid(length));

const randomIdsMultiple = generateRandomIds(5, 8);
const randomIds = generateRandomIds(10, 8);
const disabledStateTest = false;
const regexString = /[^a-zA-Z0-9@.]/g;

type TTestingForm = {
	dateRange: [Date, Date];
	multiple: string[];
	searchBar: string;
	myText: string;
	myNumber: number;
};

const TestSchema: ZodType<TTestingForm> = z.object({
	dateRange: z.tuple([z.date(), z.date()]),
	multiple: z.array(z.string().toLowerCase().trim().min(1)).nonempty(),
	searchBar: z.string().toLowerCase().trim().min(1),
	myText: z.string().toLowerCase().trim().min(8),
	myNumber: z.number().finite().safe().min(-20).max(20),
});

const LandingPage = () => {
	// Store
	const toggleDarkMode = useBoundStore((state) => state.toggleDarkMode);

	const handleClick = () => {
		toggleDarkMode();
	};

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
		console.log(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(submitData)} className={'container'}>
			{/* ############################################## */}
			{/* ############################################## */}

			<CustomizableButton handleClick={handleClick}>
				<Moon></Moon>
				<Sun></Sun>
			</CustomizableButton>

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
						label={['début', 'fin']}
						isSubmit={isSubmitting}
						isValid={isValid}
						open={false}
						disabled={disabledStateTest}
						onFieldChange={onChange}
						size='standard'
						className='testDatePicker'
					></DatePicker>
				)}
			/>

			{/* ############################################## */}
			{/* ############################################## */}
			<Controller
				control={control}
				name='multiple'
				render={({ field: { onChange } }) => (
					<SelectMultiple
						data={randomIdsMultiple}
						placeholder='Multiple'
						label='Multiple'
						labelPosition='justify'
						size={31}
						overSizeLimit={999}
						isSubmit={isSubmitting}
						isValid={isValid}
						pickLimit={3}
						disabled={disabledStateTest}
						onFieldChange={onChange}
					></SelectMultiple>
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
						size={31}
						placeholder='Search'
						label='Search'
						labelPosition='end'
						overSizeLimit={999}
						isSubmit={isSubmitting}
						isValid={isValid}
						disabled={disabledStateTest}
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
						regex={regexString}
						placeholder='My text here!'
						label='String'
						labelPosition='start'
						errors={errors['myText']?.message}
						size={31}
						isSubmit={isSubmitting}
						isValid={isValid}
						disabled={disabledStateTest}
						onFieldChange={onChange}
					></InputString>
				)}
			/>

			{/* ############################################## */}
			{/* ############################################## */}

			<Controller
				control={control}
				name='myNumber'
				render={({ field: { onChange } }) => (
					<InputNumber
						placeholder='My number here!'
						label='Number'
						labelPosition='center'
						size={30}
						errors={errors['myNumber']?.message}
						step='0.1'
						min='-20'
						max='20'
						outputNumber={true}
						isSubmit={isSubmitting}
						isValid={isValid}
						disabled={disabledStateTest}
						onFieldChange={onChange}
					></InputNumber>
				)}
			/>

			{/* ############################################## */}
			{/* ############################################## */}

			<FormButton
				isValid={isValid}
				isSubmit={isSubmitting}
				disabled={disabledStateTest}
				placeholder={'Validation'}
			></FormButton>
		</form>
	);
};
export default LandingPage;

// Génère un nombre aléatoire entre x et y (inclus)
const getRandomNbs = (x: number, y: number): number => {
	return Math.floor(Math.random() * (y - x + 1)) + x;
};
