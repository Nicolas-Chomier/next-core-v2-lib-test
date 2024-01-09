// React core
import { useCallback, useEffect, useState } from 'react';
// External modules / Third-party libraries
import { Check, Hash, X } from 'lucide-react';
// Styles
import './InputNumber.css';

type TInputNumberProps = {
	errors?: string;
	placeholder?: string;
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
			if (isValid) {
				return (
					<div className={`${'inputNumber_icon_wrapper'}`}>
						<Check
							size={20}
							strokeWidth={1.8}
							className='inputNumber_valid_icon'
						/>
					</div>
				);
			} else if (searchValue) {
				return (
					<button
						className={`${'inputNumber_reset_button'}`}
						onClick={handleReset}
					>
						<X
							size={23}
							strokeWidth={1.6}
							className='inputNumber_reset_icon'
						/>
					</button>
				);
			}
			return (
				<div className={`${'inputNumber_icon_wrapper'}`}>
					<Hash
						size={19}
						strokeWidth={1.5}
						className={`inputNumber_ambiance_icon ${
							disabled ? 'inputString_icon_disabled' : ''
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
		<div className={`inputNumber_container ${className}`}>
			<input
				type='number'
				step={step}
				min={min}
				max={max}
				placeholder={placeholder}
				onChange={handleInputChange}
				value={inputValue}
				disabled={disabled}
				className='inputNumber_text_field'
			/>

			{displayButtonActions(isValid, inputValue)}

			<TooltipErrorMessage message={errors} disabled={disabled} />
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
	return <div className='inputNumber_error_message'>{message}</div>;
};
