// React core
import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	useMemo,
} from 'react';
// External modules / Third-party libraries
import { Check, CopyCheck, Eraser, X } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
// Styles
import './SelectMultiple.css';

// Props type for SelectMultiple component
type TSelectMultipleProps = {
	data: string[];
	placeholder?: string;
	isSubmit?: boolean;
	isValid?: boolean;
	overSizeLimit?: number;
	disabled?: boolean;
	className?: string;
	onFieldChange: (value: string[]) => void;
};

//+++++ SEARCH BAR +++++//
export const SelectMultiple: React.FC<TSelectMultipleProps> = ({
	data,
	placeholder,
	isSubmit,
	isValid,
	overSizeLimit = 999,
	disabled = false,
	className,
	onFieldChange,
}) => {
	const [isPanelVisible, setIsPanelVisible] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [selectedValues, setSelectedValues] = useState<string[]>([]);
	const [filteredData, setFilteredData] = useState<string[]>([]);

	const clickRef = useRef(null);

	// Handler for outside clicks to close the calendar
	useClickOutside(clickRef, () => setIsPanelVisible(false));

	// Memo to remove duplicate item and selected item from main data
	const cleanData = useMemo(() => {
		const removeSelectedData = data.filter(
			(value) => selectedValues.includes(value) === false,
		);
		return [...new Set(removeSelectedData)];
	}, [data, selectedValues]);

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
			setSearchValue('');
			setSelectedValues((prev) => [...prev, item]);
			event.preventDefault();
		},
		[],
	);

	// Erase handler for clearing search field
	const handleErase = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setSearchValue('');
			event.preventDefault();
		},
		[],
	);

	// Reset handler for clearing everything
	const handleReset = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setSearchValue('');
			setSelectedValues([]);
			onFieldChange([]);
			setIsPanelVisible(false);
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
		(isValid: boolean | undefined) => {
			if (isValid) {
				return (
					<div className={`${'selectMultiple_icon_wrapper'}`}>
						<Check
							size={20}
							strokeWidth={1.8}
							className='selectMultiple_valid_icon'
						/>
					</div>
				);
			} else {
				return (
					<div className={`${'selectMultiple_icon_wrapper'}`}>
						<CopyCheck
							size={20}
							strokeWidth={1.7}
							className={`selectMultiple_basic_icon ${
								disabled
									? 'selectMultiple_basic_icon_disabled'
									: ''
							}`}
						/>
					</div>
				);
			}
		},
		[disabled],
	);

	// Effect to reset after submission
	useEffect(() => {
		if (isSubmit) {
			setSearchValue('');
			setSelectedValues([]);
			setIsPanelVisible(false);
		}
	}, [isSubmit, onFieldChange]);

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
			onFieldChange([]);
			setIsPanelVisible(false);
		}
	}, [isSubmit, onFieldChange]);

	// Effect to send updated result
	useEffect(() => {
		onFieldChange(selectedValues);
	}, [onFieldChange, selectedValues]);

	//+ TSX
	return (
		<div className={`selectMultiple_container ${className}`} ref={clickRef}>
			<button
				onClick={openPanel}
				className='selectMultiple_input_button_wrapper'
			>
				<input
					className={`selectMultiple_input_hidden
					${isPanelVisible && 'selectMultiple_input'}`}
					type='text'
					onChange={handleInputChange}
					value={searchValue}
					placeholder={placeholder}
					disabled={disabled}
				/>
			</button>

			<ItemsDisplayer
				values={selectedValues}
				isPanelVisible={isPanelVisible}
				handleClickReset={handleReset}
				handleClickErase={handleErase}
			></ItemsDisplayer>

			{displayButtonActions(isValid)}

			<div
				className={`selectMultiple_panel_hidden ${
					isPanelVisible && 'selectMultiple_panel'
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

// Sub componenent which display selected items
type TItemsDisplayerProps = {
	values: string[];
	isPanelVisible: boolean;
	handleClickErase: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleClickReset: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ItemsDisplayer: React.FC<TItemsDisplayerProps> = ({
	values,
	isPanelVisible,
	handleClickErase,
	handleClickReset,
}) => {
	return (
		<div
			className={`selectMultiple_hidden_wrapper_displayer
					${isPanelVisible && 'selectMultiple_wrapper_displayer'}`}
		>
			{isPanelVisible ? (
				<>
					<button
						className='selectMultiple_displayer_erase_button'
						onClick={handleClickErase}
					>
						<Eraser
							size={18}
							strokeWidth={1.7}
							className='selectMultiple_reset_icon'
						/>
					</button>
					<div className='selectMultiple_item_displayer'>
						{values.map((item: string) => {
							return (
								<span
									key={item}
									className='selectMultiple_items'
								>
									{item}
								</span>
							);
						})}
					</div>

					<button
						className='selectMultiple_displayer_reset_button'
						onClick={handleClickReset}
					>
						<X
							size={21}
							strokeWidth={1.6}
							className='selectMultiple_reset_icon'
						/>
					</button>
				</>
			) : null}
		</div>
	);
};

// Sub componenents to display items in collapsable panel
type TselectMultipleListProps = {
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
const LargeList: React.FC<TselectMultipleListProps> = ({
	data,
	handleClick,
}) => {
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
			className={'selectMultiple_list'}
			style={{
				height: `${size < 13 ? size * 24 : 300}px`,
			}}
			totalCount={data.length}
			itemContent={itemContent}
		/>
	);
};

// Tiny list used to display less than 1000 items
const TinyList: React.FC<TselectMultipleListProps> = ({
	data,
	handleClick,
}) => {
	return (
		<ul className='selectMultiple_list'>
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
			className='selectMultiple_row_button'
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
