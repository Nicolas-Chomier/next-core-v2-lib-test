// React core
import { useEffect } from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
import { capitalize } from '@/app/functions/capitalize';
import { handleKeyDown } from '@/app/functions/handleKeyDown';
// Configuration
// Styles
import styles from './InputText.module.css';

type TInputTextProps = {
	type: 'text' | 'email' | 'password';
	label: string;
	placeholder: string;
	disabled: boolean;
	register: any;
	setValue?: any;
	errors: any;
};

export const InputText = ({
	type = 'text',
	label = 'text',
	placeholder = 'Votre texte',
	disabled = false,
	register,
	setValue,
	errors,
}: TInputTextProps) => {
	useEffect(() => {
		if (disabled) setValue(label, null);
	}, [disabled, label, setValue]);

	return (
		<div className={styles.container}>
			<input
				id={label}
				type={type}
				name={label}
				{...register(label)}
				placeholder={capitalize(label) || placeholder}
				onKeyDown={(e) => handleKeyDown(e, type)}
				disabled={disabled}
				className={`${styles.input} ${
					errors[label] && styles.input_error
				}`}
			/>

			<p className={styles.error_text}>
				{errors[label] ? errors[label].message : 'ㅤ'}
			</p>
		</div>
	);
};
