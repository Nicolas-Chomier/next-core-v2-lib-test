// React core
import React, { useState, useMemo, useRef } from 'react';
// External modules / Third-party libraries
import { Search } from 'lucide-react';
// Local components
// Hooks and utilities
import { useOnClickOutside } from '@/app/hooks/useOnClickOutside';
// Configuration
import { ICON_SIZE_M, ICON_STROKE_L } from '@/config/constantes';
// Styles
import styles from './SearchBar.module.css';

// Props type for SearchBar component
type TSearchBarProps = {
	data: string[];
	placeHolder?: string;
	onChange: (value: string) => void;
};

export const SearchBar = ({ data, placeHolder, onChange }: TSearchBarProps) => {
	/* const { isDarkMode } = setDarkMode(); */
	const containerRef = useRef(null);
	// Hook to manage clicks outside the component and close the drop-down menu
	useOnClickOutside(containerRef, () => setPanelVisibility(false));

	// State for managing the visibility of dropdown panel
	const [isPanelVisible, setPanelVisibility] = useState(false);

	// State for the current value of the search input
	const [searchValue, setSearchValue] = useState<string>('');

	// Event handler for changes in the search input
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	// Event handler for selecting an item from the dropdown
	const handleItemClick = (item: string) => {
		setSearchValue(item);
		setPanelVisibility(false);
	};

	// Send input value
	const handleClick = () => {
		setPanelVisibility(false);
		if (searchValue) {
			onChange(searchValue);
			setSearchValue('');
		}
	};

	// Filtering the data based on the search input
	const filteredData = useMemo(
		() =>
			data.filter((item: string) =>
				item.toLowerCase().includes(searchValue.toLowerCase()),
			),
		[data, searchValue],
	);
	return (
		<div className={`${styles.container}`} ref={containerRef}>
			<div className={styles.wrapper}>
				<input
					className={styles.input}
					type='text'
					onChange={handleInputChange}
					value={searchValue}
					onClick={() => setPanelVisibility(true)}
					placeholder={placeHolder}
				/>
				<div className={styles.icon_wrapper} onClick={handleClick}>
					<Search
						size={ICON_SIZE_M}
						strokeWidth={ICON_STROKE_L}
						className={styles.icon}
					/>
				</div>
			</div>
			{isPanelVisible && (
				<div className={styles.panel}>
					<ul className={styles.ulList}>
						{filteredData.map((item) => (
							<li
								onClick={() => handleItemClick(item)}
								key={item}
								className={styles.items}
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
