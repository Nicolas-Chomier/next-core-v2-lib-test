// React core
import React, { useState, useRef, useEffect, useCallback } from 'react';
// External modules / Third-party libraries
import { Check, Search, X } from 'lucide-react';
// Local components
// Hooks and utilities

// Configuration
// Styles
import './SearchBar.css';

// Props type for SearchBar component
type TSearchBarProps = {
	data: string[];
	placeHolder?: string;
	size?: number;
	isSubmit?: boolean;
	isValid?: boolean;
	onFieldChange: (value: string | undefined) => void;
};

export const SearchBar: React.FC<TSearchBarProps> = ({
	data,
	placeHolder,
	size = 12,
	isSubmit,
	isValid,
	onFieldChange,
}) => {
	const [isPanelVisible, setIsPanelVisible] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [filteredData, setFilteredData] = useState<string[]>([]);

	// Handler for outside clicks to close the calendar
	const clickRef = useRef(null);
	const onClickOutside = () => {
		setIsPanelVisible(false);
	};
	useClickOutside(clickRef, onClickOutside);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
		setIsPanelVisible(true);
	};

	const handleItemClick = (item: string) => {
		setSearchValue(item);
		onFieldChange(item);
		setIsPanelVisible(false);
	};

	// Reset handler for clearing dates
	const handleReset = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setSearchValue('');
			onFieldChange(undefined);
			setIsPanelVisible(false);
			event.preventDefault();
			console.log('!');
		},
		[onFieldChange],
	);

	// useEffect to clean component after form validation
	useEffect(() => {
		if (isSubmit) {
			setSearchValue('');
			onFieldChange(undefined);
			setIsPanelVisible(false);
		}
	}, [isSubmit, onFieldChange]);

	useEffect(() => {
		setFilteredData(
			data.filter((item) =>
				item.toLowerCase().includes(searchValue.toLowerCase()),
			),
		);
	}, [searchValue, data]);

	return (
		<div className='container' ref={clickRef}>
			<div className='wrapper'>
				<input
					className='input'
					type='text'
					size={size}
					onChange={handleInputChange}
					value={searchValue}
					placeholder={placeHolder}
				/>
				<div className='icon_wrapper'>
					{isValid ? (
						<Check
							size={20}
							strokeWidth={1.6}
							className='searchBar_icon'
						/>
					) : isPanelVisible || searchValue ? (
						<button
							className='searchBar_reset_button'
							onClick={handleReset}
						>
							<X
								size={20}
								strokeWidth={1.6}
								className='searchBar_icon'
							/>
						</button>
					) : (
						<Search
							size={20}
							strokeWidth={1.6}
							className='searchBar_icon'
						/>
					)}
				</div>
			</div>
			{isPanelVisible && (
				<div className='panel'>
					<ul className='ulList'>
						{filteredData.map((item) => (
							<li
								onClick={() => handleItemClick(item)}
								key={item}
								className='items'
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

// Hook
const useClickOutside = (
	ref: React.RefObject<HTMLElement>,
	callback: () => void,
) => {
	const handleClick = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
};

{
	/* <button
						className='searchbar_reset_button'
						onClick={handleReset}
					>
						reset
					</button> */
}
