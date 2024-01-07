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
	className,
	onFieldChange,
}) => {
	const [isPanelVisible, setIsPanelVisible] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [filteredData, setFilteredData] = useState<string[]>([]);

	const clickRef = useRef(null);

	// Handler for outside clicks to close the calendar
	useClickOutside(clickRef, () => setIsPanelVisible(false));

	// Memo for decide which kind of list display
	const isLargeList = useMemo(() => {
		return data.length > overSizeLimit;
	}, [overSizeLimit, data]);

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
			} else if (isPanel || isSearching) {
				return (
					<button
						className={`${'searchBar_icon_wrapper'}`}
						onClick={handleReset}
					>
						<X
							size={23}
							strokeWidth={1.6}
							className='searchBar_reset_icon'
						/>
					</button>
				);
			}
			return (
				<div className={`${'searchBar_icon_wrapper'}`}>
					<Search
						size={20}
						strokeWidth={1.7}
						className='searchBar_basic_icon'
					/>
				</div>
			);
		},
		[handleReset],
	);

	// Effect to update filtered list
	useEffect(() => {
		setFilteredData(
			data.filter((item) =>
				item.toLowerCase().includes(searchValue.toLowerCase()),
			),
		);
	}, [searchValue, data]);

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

	//+ TSX
	return (
		<div className={`searchBar_container ${className}`} ref={clickRef}>
			<button
				onClick={openPanel}
				className='searchBar_input_button_wrapper'
			>
				<input
					className={`searchBar_input_hidden
					${isPanelVisible && 'searchBar_input'}`}
					type='text'
					size={size < 10 ? 10 : size}
					onChange={handleInputChange}
					value={searchValue}
					placeholder={placeholder}
					disabled={disabled}
				/>
			</button>

			{displayButtonActions(isValid, isPanelVisible, searchValue)}

			<div
				className={`searchBar_panel_hidden ${
					isPanelVisible && 'searchBar_panel'
				}`}
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
		</div>
	);
};

// Sub componenents to display items
type TSearchBarListProps = {
	data: string[];
	handleClick: (
		event: React.MouseEvent<HTMLButtonElement>,
		item: string,
	) => void;
};

type TClickableItemsProps = {
	item: string;
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
			className={'searchBar_list'}
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
		<ul className='searchBar_list'>
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

// Clickable items components
const ClickableItems: React.FC<TClickableItemsProps> = ({
	item,
	handleClick,
}) => {
	return (
		<button
			onClick={(event) => handleClick(event, item)}
			className='searchBar_row_button'
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
