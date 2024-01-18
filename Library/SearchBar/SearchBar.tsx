// React core
import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	useMemo,
} from 'react';
// External modules / Third-party libraries
import { Check, Search, X } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
// Styles
import './SearchBar.css';

// Props type for SearchBar component
type TSearchBarProps = {
	data: string[];
	placeholder?: string;
	size?: number;
	isSubmit?: boolean;
	isValid?: boolean;
	overSizeLimit?: number;
	disabled?: boolean;
	isBeautiful?: boolean;
	className?: string;
	onFieldChange: (value: string | undefined) => void;
};

//+++++ SEARCH BAR +++++//
export const SearchBar: React.FC<TSearchBarProps> = ({
	data,
	placeholder,
	size = 31,
	isSubmit,
	isValid,
	overSizeLimit = 999,
	disabled = false,
	isBeautiful = true,
	className,
	onFieldChange,
}) => {
	const [isPanelVisible, setIsPanelVisible] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [filteredData, setFilteredData] = useState<string[]>([]);

	const clickRef = useRef(null);

	// Handler for outside clicks to close the calendar
	useClickOutside(clickRef, () => setIsPanelVisible(false));

	// Memo to remove duplicate string in data (avoid key problem on JSX render)
	const cleanData = useMemo(() => {
		return [...new Set(data)];
	}, [data]);

	// Memo for decide which kind of list display
	const isLargeList = useMemo(() => {
		return cleanData.length > overSizeLimit;
	}, [overSizeLimit, cleanData]);

	// Managing input changes
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
		setIsPanelVisible(true);
	};

	// Clicking on a list item
	const handleItemClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>, item: string) => {
			setSearchValue(item);
			onFieldChange(item);
			setIsPanelVisible(false);
			event.preventDefault();
		},
		[onFieldChange],
	);

	// Reset handler for clearing search field
	const handleReset = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setSearchValue('');
			onFieldChange(undefined);
			event.preventDefault();
		},
		[onFieldChange],
	);

	// Panel openning
	const openPanel = (event: React.MouseEvent<HTMLButtonElement>) => {
		setIsPanelVisible(true);
		event.preventDefault();
	};

	// Display action buttons
	const displayButtonActions = useCallback(
		(
			isValid: boolean | undefined,
			isPanel: boolean,
			isSearching: string,
		) => {
			const cssClass = 'searchBar-icon-wrapper';

			if (isValid) {
				return (
					<button className={cssClass} onClick={handleReset}>
						<Check
							size={20}
							strokeWidth={1.8}
							className='searchBar-valid-icon'
						/>
					</button>
				);
			} else if (isPanel || isSearching) {
				return (
					<button className={cssClass} onClick={handleReset}>
						<X
							size={23}
							strokeWidth={1.6}
							className='searchBar-reset-icon'
						/>
					</button>
				);
			}

			const iconClass = disabled
				? 'searchBar-icon-disabled'
				: 'searchBar-icon';

			return (
				<button
					className={cssClass}
					disabled={disabled}
					onClick={openPanel}
				>
					<Search size={19} strokeWidth={1.7} className={iconClass} />
				</button>
			);
		},
		[handleReset, disabled],
	);

	// Effect to update filtered list
	useEffect(() => {
		setFilteredData(
			cleanData.filter((item) =>
				item.toLowerCase().includes(searchValue.toLowerCase()),
			),
		);
	}, [searchValue, cleanData]);

	// Effect to reset after submission
	useEffect(() => {
		if (isSubmit) {
			setSearchValue('');
			onFieldChange(undefined);
			setIsPanelVisible(false);
		}
	}, [isSubmit, onFieldChange]);

	// Effect to reset is field value doesnt exist anymore
	useEffect(() => {
		if (!searchValue) {
			onFieldChange(undefined);
		}
	}, [searchValue, onFieldChange]);

	// Effect to reset all value when component is disabled
	useEffect(() => {
		if (disabled) {
			setSearchValue('');
		}
	}, [disabled]);

	//+ TSX
	return (
		<div className={`searchBar-container ${className}`} ref={clickRef}>
			<div
				className={`${disabled && 'searchBar-content-wrapper-disabled'}
					${
						isPanelVisible
							? 'searchBar-content-wrapper-visible'
							: 'searchBar-content-wrapper'
					}`}
			>
				<button
					onClick={openPanel}
					className='searchBar-clickable-wrapper'
					disabled={disabled}
				>
					<input
						className='searchBar-input-text'
						type='text'
						size={size < 21 ? 21 : size}
						onChange={handleInputChange}
						value={searchValue}
						placeholder={placeholder}
						disabled={disabled}
					/>
				</button>

				{displayButtonActions(isValid, isPanelVisible, searchValue)}
			</div>
			{isPanelVisible ? (
				<div
					className={`searchBar-removable-panel ${
						isBeautiful ? 'beautiful-background' : ''
					} `}
				>
					{isLargeList ? (
						<LargeList
							data={filteredData}
							handleClick={handleItemClick}
						></LargeList>
					) : (
						<TinyList
							data={filteredData}
							handleClick={handleItemClick}
						></TinyList>
					)}
				</div>
			) : null}
		</div>
	);
};

type TSearchBarListProps = {
	data: string[];
	handleClick: (
		event: React.MouseEvent<HTMLButtonElement>,
		item: string,
	) => void;
};
// Virtuoso large list able to display more than 1000 items
const LargeList: React.FC<TSearchBarListProps> = ({ data, handleClick }) => {
	const size = data.length;
	const itemContent = (index: number) => {
		const item = data[index];
		return (
			<ClickableItems
				key={item}
				item={item}
				handleClick={handleClick}
			></ClickableItems>
		);
	};
	return (
		<Virtuoso
			className='searchBar-item-list'
			style={{
				height: `${size < 13 ? size * 24 : 300}px`,
			}}
			totalCount={data.length}
			itemContent={itemContent}
		/>
	);
};

// Tiny list used to display less than 1000 items
const TinyList: React.FC<TSearchBarListProps> = ({ data, handleClick }) => {
	return (
		<ul className='searchBar-item-list'>
			{data.map((item) => (
				<ClickableItems
					key={item}
					item={item}
					handleClick={handleClick}
				></ClickableItems>
			))}
		</ul>
	);
};

type TClickableItemsProps = {
	item: string;
	handleClick: (
		event: React.MouseEvent<HTMLButtonElement>,
		item: string,
	) => void;
};
// Clickable items components
const ClickableItems: React.FC<TClickableItemsProps> = ({
	item,
	handleClick,
}) => {
	return (
		<button
			onClick={(event) => handleClick(event, item)}
			className='searchBar-clickable-items'
		>
			{item}
		</button>
	);
};

// Custom hook to click outside the component
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
