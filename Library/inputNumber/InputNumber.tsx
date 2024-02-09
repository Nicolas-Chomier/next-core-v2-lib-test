// React core
import React, { useState, useEffect, useCallback } from 'react';
// External modules / Third-party libraries
import { Check, Hash, X } from 'lucide-react';
// Styles
import './InputNumber.css';

type TInputNumberProps = {
	errors?: string;
	placeholder?: string;
	label?: string;
	labelPosition?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify';
	size?: number;
	step?: string;
	min?: string;
	max?: string;
	outputNumber?: boolean;
	isSubmit?: boolean;
	isValid?: boolean;
	disabled?: boolean;
	className?: string;
	onFieldChange: (value: string | number | undefined) => void;
};

export const InputNumber: React.FC<TInputNumberProps> = ({
	placeholder = 'My number here!',
	label,
	labelPosition = 'center',
	size = 16,
	errors = '',
	step = '1',
	min = '-99999',
	max = '99999',
	outputNumber = true,
	isSubmit = false,
	isValid = false,
	disabled = false,
	className = undefined,
	onFieldChange,
}) => {
	const [inputValue, setInputValue] = useState<string>('');

	// Managing input changes with or with out REGEX
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (outputNumber) {
			onFieldChange(parseFloat(event.target.value));
		} else {
			onFieldChange(event.target.value);
		}
		setInputValue(event.target.value);
	};

	// Reset handler for clearing search field
	const handleReset = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setInputValue('');
			onFieldChange(undefined);
			event.preventDefault();
		},
		[onFieldChange],
	);

	// Display action buttons
	const displayButtonActions = useCallback(
		(isValid: boolean | undefined, searchValue: string) => {
			const cssClass = 'inputNumber-icon-wrapper';
			if (isValid) {
				return (
					<div className={cssClass}>
						<Check
							size={20}
							strokeWidth={1.8}
							className='inputNumber-valid-icon'
						/>
					</div>
				);
			} else if (searchValue) {
				return (
					<button className={cssClass} onClick={handleReset}>
						<X
							size={23}
							strokeWidth={1.6}
							className='inputNumber-reset-icon'
						/>
					</button>
				);
			}
			return (
				<div className={cssClass}>
					<Hash
						size={18}
						strokeWidth={1.5}
						className={`inputNumber-ambiance-icon ${
							disabled ? 'inputString-icon-disabled' : ''
						}`}
					/>
				</div>
			);
		},
		[handleReset, disabled],
	);

	// Effect to reset after submission
	useEffect(() => {
		if (isSubmit) {
			setInputValue('');
			onFieldChange(undefined);
		}
	}, [isSubmit, onFieldChange]);

	// Effect to reset if component disabled
	useEffect(() => {
		if (disabled) {
			setInputValue('');
			onFieldChange(undefined);
		}
	}, [disabled, onFieldChange]);

	//+ TSX
	return (
		<div className={`inputNumber-super-container`}>
			{label ? (
				<label
					className='inputNumber-label'
					htmlFor={label}
					style={{ textAlign: labelPosition }}
				>
					{label}
				</label>
			) : null}

			<div className={`inputNumber-container ${className}`}>
				<input
					type='number'
					name={label}
					step={step}
					min={min}
					max={max}
					placeholder={placeholder}
					onChange={handleInputChange}
					value={inputValue}
					disabled={disabled}
					className={`inputNumber-text-field ${
						isValid ? 'inputNumber-text-field-valid-style' : null
					}`}
					style={{ inlineSize: `${size * 8.1}px` }}
				/>

				{displayButtonActions(isValid, inputValue)}

				<TooltipErrorMessage message={errors} disabled={disabled} />
			</div>
		</div>
	);
};

type TTooltipErrorMessageProps = {
	message?: string;
	disabled: boolean;
};

const TooltipErrorMessage: React.FC<TTooltipErrorMessageProps> = ({
	message,
	disabled,
}) => {
	if (!message || disabled) return null;
	return <div className='inputNumber-error-message'>{message}</div>;
};
