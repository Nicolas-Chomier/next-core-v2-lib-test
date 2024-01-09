// React core
import { useCallback, useEffect, useState } from 'react';
// External modules / Third-party libraries
import { AtSign, CaseSensitive, Check, KeyRound, X } from 'lucide-react';
// Styles
import './InputString.css';

type TInputStringProps = {
	type: 'text' | 'email' | 'password';
	regex?: RegExp;
	errors?: string;
	placeholder?: string;
	size?: number;
	isSubmit?: boolean;
	isValid?: boolean;
	disabled?: boolean;
	className?: string;
	onFieldChange: (value: string | undefined) => void;
};

export const InputString: React.FC<TInputStringProps> = ({
	type = 'text',
	regex = undefined,
	placeholder = 'My text here!',
	errors = '',
	size = 16,
	isSubmit = false,
	isValid = false,
	disabled = false,
	className = undefined,
	onFieldChange,
}) => {
	const [inputValue, setInputValue] = useState<string>('');

	// Managing input changes with or with out REGEX
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (regex) {
			const filteredValue = event.target.value.replace(regex, '');
			setInputValue(filteredValue);
			onFieldChange(filteredValue);
		} else {
			setInputValue(event.target.value);
			onFieldChange(event.target.value);
		}
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

	// Display icon depending on type
	const inputStringLogo = useCallback(() => {
		let displayedIcon;

		switch (type) {
			case 'password':
				displayedIcon = (
					<KeyRound
						size={18}
						strokeWidth={1.6}
						className={` inputString_password_icon ${
							disabled ? 'inputString_icon_disabled' : ''
						}`}
					/>
				);
				break;
			case 'email':
				displayedIcon = (
					<AtSign
						size={19}
						strokeWidth={1.6}
						className={` inputString_email_icon ${
							disabled ? 'inputString_icon_disabled' : ''
						}`}
					/>
				);
				break;
			default:
				displayedIcon = (
					<CaseSensitive
						size={23}
						strokeWidth={1.4}
						className={` inputString_text_icon ${
							disabled ? 'inputString_icon_disabled' : ''
						}`}
					/>
				);
				break;
		}

		return displayedIcon;
	}, [type, disabled]);

	// Display action buttons
	const displayButtonActions = useCallback(
		(isValid: boolean | undefined, searchValue: string) => {
			if (isValid) {
				return (
					<div className={`${'inputString_icon_wrapper'}`}>
						<Check
							size={20}
							strokeWidth={1.8}
							className='inputString_valid_icon'
						/>
					</div>
				);
			} else if (searchValue) {
				return (
					<button
						className={`${'inputString_reset_button'}`}
						onClick={handleReset}
					>
						<X
							size={23}
							strokeWidth={1.6}
							className='inputString_reset_icon'
						/>
					</button>
				);
			}
			return (
				<div className={`${'inputString_icon_wrapper'}`}>
					{inputStringLogo()}
				</div>
			);
		},
		[handleReset, inputStringLogo],
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
		<div className={`inputString_container ${className}`}>
			<input
				type={type}
				placeholder={placeholder}
				onChange={handleInputChange}
				value={inputValue}
				size={size < 10 ? 10 : size}
				disabled={disabled}
				className='inputString_text_field'
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
	return <div className='inputString_error_message'>{message}</div>;
};
