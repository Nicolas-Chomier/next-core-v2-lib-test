// React core
import React from 'react';
// Styles
import './FormButton.css';

type TFormButtonProps = {
	isSubmit?: boolean;
	isValid?: boolean;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
};

export const FormButton: React.FC<TFormButtonProps> = ({
	isValid,
	isSubmit,
	placeholder = 'Validation',
	disabled = false,
	className,
}) => {
	// Content based on the button's state
	const buttonContent = isSubmit ? (
		<span className='formButton_spinner'></span>
	) : (
		<span
			className={`formButton_text ${
				isValid && !disabled ? 'formButton_text_valid' : ''
			}`}
		>
			{placeholder}
		</span>
	);

	return (
		<button
			type='submit'
			disabled={disabled || !isValid}
			className={`formButton_container ${className}`}
		>
			{buttonContent}
		</button>
	);
};
