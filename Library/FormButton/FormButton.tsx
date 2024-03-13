// React core
import React from 'react';
// Styles
import './FormButton.css';

type TFormButtonProps = {
	size?: number | 'auto';
	isSubmit?: boolean;
	isValid?: boolean;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
};

export const FormButton: React.FC<TFormButtonProps> = ({
	size = 'auto',
	isValid,
	isSubmit,
	placeholder = 'Validation',
	disabled = false,
	className,
}) => {
	const btnSize = size !== 'auto' ? { width: `${size * 9.8}px` } : {};
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
			style={{ ...btnSize }}
			className={`${className ?? 'formButton_container_default'} ${
				size === 'auto' ? 'formButton_container_auto_size' : ''
			}`}
		>
			{buttonContent}
		</button>
	);
};
