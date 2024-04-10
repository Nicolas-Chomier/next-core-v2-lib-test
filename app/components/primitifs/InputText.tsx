// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './InputText.module.css';

type InputTextProps = {
	name: string;
	placeholder?: string;
	className?: string;
	isDisable?: boolean;
	isRequired?: boolean;
	isValid?: boolean;
	isError?: boolean;
	value: string;
	onChange: (value: string) => void;
};

export const InputText: React.FC<InputTextProps> = ({
	name,
	placeholder = 'my text here !',
	className = '',
	isDisable = false,
	isRequired = false,
	isValid = false,
	isError = false,
	value,
	onChange,
}) => {
	// Classes CSS passées par default
	const defaultClassName = className || styles.inputText;

	return (
		<input
			type='text'
			spellCheck='true'
			name={name}
			id={`U${name}`}
			placeholder={placeholder}
			disabled={isDisable}
			required={isRequired}
			className={defaultClassName}
			onChange={(e) => onChange(e.target.value)}
			value={value}
			{...(isValid && { 'data-isvalid': isValid })}
			{...(isError && { 'data-iserror': isError })}
		/>
	);
};
