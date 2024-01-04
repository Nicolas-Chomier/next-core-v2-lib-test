// React core
import React from 'react';
// External modules / Third-party libraries
import { Grid, Text } from '@radix-ui/themes';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
// Local components
import { InputText } from '@/app/components/shared/inputs/inputText/InputText';
import { SelectBasic } from '@/app/components/shared/selects/basic/SelectBasic';
import { FormButton } from '@/app/components/shared/buttons/FormButton';
// Hooks and utilities
import { Controller, useForm } from 'react-hook-form';
import useMediaQuery from '@/app/hooks/useMediaQuery';
// Configuration
import settings from '@/settings/settings';
import { AddUserSchema } from '@/app/schema/addUserForm';
// Styles
import styles from './AddUserForm.module.css';

type TAddUserFormProps = {
	handlePost: (obj: TAddUserForm) => void;
};

type TAddUserForm = {
	email: string;
	name: string;
	rank: string;
	password: string;
};

export const AddUserForm = ({ handlePost }: TAddUserFormProps) => {
	// Build ranking list for the input select component
	const rankingList = Object.keys(settings.USERS_CONFIG).splice(1, 4);
	const isSmartphoneSize = useMediaQuery(settings.SMARTPHONE_BREAKPOINT);

	// Use form hook which manage the entire form
	const {
		setValue,
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isValid, isLoading },
	} = useForm<TAddUserForm>({
		mode: 'onChange',
		resolver: zodResolver(AddUserSchema),
	});

	// Send Data to page component above and reset form
	const submitData = async (data: TAddUserForm) => {
		handlePost(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(submitData)} className={styles.container}>
			<Text size={'6'}>Add new user</Text>
			<Grid
				gap='3'
				columns={isSmartphoneSize ? '1' : '2'}
				align={'start'}
				justify={'center'}
			>
				<InputText
					type='email'
					label='email'
					placeholder='Email...'
					disabled={false}
					register={register}
					setValue={setValue}
					errors={errors}
				/>

				<InputText
					type='text'
					label='name'
					placeholder='Name...'
					disabled={false}
					register={register}
					setValue={setValue}
					errors={errors}
				/>

				<InputText
					type='password'
					label='password'
					placeholder='Password...'
					disabled={false}
					register={register}
					setValue={setValue}
					errors={errors}
				/>

				<Controller
					control={control}
					name='rank'
					render={({ field }) => (
						<SelectBasic
							field={field}
							contentToDisplay={rankingList}
						></SelectBasic>
					)}
				/>
			</Grid>
			<FormButton display={isValid} isLoading={isLoading}></FormButton>
		</form>
	);
};
