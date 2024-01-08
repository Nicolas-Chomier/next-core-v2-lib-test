// React core
import { useCallback, useEffect, useState } from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
// Styles
import './InputString.css';
import { AtSign, Check, Hash, KeyRound, X } from 'lucide-react';

type TInputStringProps = {
	type: 'text' | 'email' | 'password';
	placeholder?: string;
	disabled: boolean;
	isSubmit?: boolean;
	isValid?: boolean;
	size?: number;
	errors?: string;
	className?: string;
	onFieldChange: (value: string | undefined) => void;
};

export const InputString: React.FC<TInputStringProps> = ({
	type = 'text',
	placeholder,
	disabled = false,
	size,
	isSubmit,
	isValid,
	errors,
	className,
	onFieldChange,
}) => {
	console.log(errors);
	const [searchValue, setSearchValue] = useState('');

	// Managing input changes
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
		onFieldChange(event.target.value);
	};

	// Reset handler for clearing search field
	const handleReset = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setSearchValue('');
			onFieldChange(undefined);
			event.preventDefault();
		},
		[onFieldChange],
	);

	//
	const inputStringLogo = useCallback(() => {
		let displayedIcon;

		switch (type) {
			case 'password':
				displayedIcon = (
					<KeyRound
						size={23}
						strokeWidth={1.6}
						className='inputString_icon'
					/>
				);
				break;
			case 'email':
				displayedIcon = (
					<AtSign
						size={23}
						strokeWidth={1.6}
						className='inputString_icon'
					/>
				);
				break;
			default:
				displayedIcon = (
					<Hash
						size={23}
						strokeWidth={1.6}
						className='inputString_icon'
					/>
				);
				break;
		}

		return displayedIcon;
	}, [type]);

	// Display action buttons
	const displayButtonActions = useCallback(
		(isValid: boolean | undefined, searchValue: string) => {
			if (isValid) {
				return (
					<div className={`${'searchBar_icon_wrapper'}`}>
						<Check
							size={20}
							strokeWidth={1.8}
							className='searchBar_valid_icon'
						/>
					</div>
				);
			} else if (searchValue) {
				return (
					<button
						className={`${'searchBar_icon_wrapper'}`}
						onClick={handleReset}
					>
						<X
							size={23}
							strokeWidth={1.6}
							className='inputString_icon'
						/>
					</button>
				);
			}
			return (
				<div className={`${'searchBar_icon_wrapper'}`}>
					{inputStringLogo()}
				</div>
			);
		},
		[handleReset, inputStringLogo],
	);

	// Effect to reset after submission
	useEffect(() => {
		if (isSubmit) {
			setSearchValue('');
			onFieldChange(undefined);
		}
	}, [isSubmit, onFieldChange]);

	//+ TSX
	return (
		<div className={`inputString_container ${className}`}>
			<input
				type={type}
				placeholder={placeholder}
				onChange={handleInputChange}
				value={searchValue}
				size={size}
				disabled={disabled}
				className={`${'input_string_text_field'} ${
					errors && 'input_string_text_field'
				}`}
			/>
			{displayButtonActions(isValid, searchValue)}
		</div>
	);
};
