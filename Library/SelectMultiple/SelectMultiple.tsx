// React core
import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	useMemo,
} from 'react';
// External modules / Third-party libraries
import { Check, CopyCheck, X } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
// Styles
import './SelectMultiple.css';

// Props type for SelectMultiple component
type TSelectMultipleProps = {
	data?: string[];
	placeholder?: string;
	label?: string;
	labelPosition?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify';
	size?: number;
	isSubmit?: boolean;
	isValid?: boolean;
	pickLimit?: number;
	overSizeLimit?: number;
	disabled?: boolean;
	isBeautiful?: boolean;
	className?: string;
	onFieldChange: (value: string[]) => void;
};

//+++++ SELECT MULTIPLE +++++//
export const SelectMultiple: React.FC<TSelectMultipleProps> = ({
	data,
	placeholder,
	label,
	labelPosition = 'center',
	size = 31,
	isSubmit,
	isValid,
	pickLimit = 0,
	overSizeLimit = 999,
	disabled = false,
	isBeautiful = true,
	className,
	onFieldChange,
}) => {
	const [isPanelVisible, setIsPanelVisible] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [selectedValues, setSelectedValues] = useState<string[]>([]);
	const [filteredData, setFilteredData] = useState<string[]>([]);
	const [pickedItemInfos, setPickedItemInfos] = useState('');

	// Used for click outside hook
	const clickRef = useRef(null);

	// Determine the selected value array size
	const sizeRef = useRef(0);

	// Handler for outside clicks to close the calendar
	useClickOutside(clickRef, () => setIsPanelVisible(false));

	// Memo to remove duplicate item and selected item from main data
	const cleanData = useMemo(() => {
		if (!data) return null;
		const removeSelectedData = data.filter(
			(value) => selectedValues.includes(value) === false,
		);
		return [...new Set(removeSelectedData)];
	}, [data, selectedValues]);

	// Memo for decide which kind of list display
	const isLargeList = useMemo(() => {
		if (cleanData) {
			return cleanData.length > overSizeLimit;
		}
	}, [overSizeLimit, cleanData]);

	// Managing input changes
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
		setIsPanelVisible(true);
	};

	// Clicking on a list item
	const handleItemClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>, item: string) => {
			if (sizeRef.current < pickLimit || pickLimit === 0) {
				setSearchValue('');
				setSelectedValues((prev) => [...prev, item]);
			}

			event.preventDefault();
		},
		[pickLimit],
	);

	// Delete handler for each item
	const handleDelete = useCallback(
		(item: string, event: React.MouseEvent<HTMLButtonElement>) => {
			setSelectedValues(() => [
				...selectedValues.filter((value) => value !== item),
			]);

			event.preventDefault();
		},
		[selectedValues],
	);

	// Reset handler for clearing everything
	const handleReset = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setSearchValue('');
			setSelectedValues([]);
			setIsPanelVisible(false);
			event.preventDefault();
		},
		[],
	);

	// Panel openning
	const openPanel = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			if (!cleanData) {
				alert('No datas available !');
			} else {
				setIsPanelVisible(true);
				event.preventDefault();
			}
		},
		[cleanData],
	);

	// Display action buttons
	const displayButtonActions = useCallback(
		(
			isValid: boolean | undefined,
			isPanel: boolean,
			isSearching: string,
		) => {
			const cssClass = 'selectMultiple-icon-wrapper';

			if (isValid) {
				return (
					<button
						className={cssClass}
						disabled={disabled}
						onClick={handleReset}
					>
						<Check
							size={20}
							strokeWidth={1.8}
							className='selectMultiple-valid-icon'
						/>
					</button>
				);
			}

			if (isPanel || isSearching) {
				return (
					<button
						className={cssClass}
						disabled={disabled}
						onClick={handleReset}
					>
						<X
							size={22}
							strokeWidth={1.7}
							className='selectMultiple-erase-icon'
						/>
					</button>
				);
			}

			const iconClass = disabled
				? 'selectMultiple-icon-disabled'
				: 'selectMultiple-icon';

			return (
				<button
					className={cssClass}
					disabled={disabled}
					onClick={openPanel}
				>
					<CopyCheck
						size={19}
						strokeWidth={1.6}
						className={iconClass}
					/>
				</button>
			);
		},
		[disabled, openPanel, handleReset],
	);

	// Effect to reset after submission
	useEffect(() => {
		if (isSubmit) {
			setSearchValue('');
			setSelectedValues([]);
			setIsPanelVisible(false);
		}
	}, [isSubmit, onFieldChange]);

	// Effect to reset after disabled
	useEffect(() => {
		if (disabled) {
			setSearchValue('');
			setSelectedValues([]);
			setIsPanelVisible(false);
		}
	}, [disabled]);

	// Effect to update filtered list
	useEffect(() => {
		if (cleanData) {
			setFilteredData(
				cleanData.filter((item) =>
					item.toLowerCase().includes(searchValue.toLowerCase()),
				),
			);
		}
	}, [searchValue, cleanData]);

	// Effect to send updated result
	useEffect(() => {
		sizeRef.current = selectedValues.length;
		onFieldChange(selectedValues);
	}, [onFieldChange, selectedValues]);

	// Effect to inform user about the numbers of item selected when component is closed
	useEffect(() => {
		const pickLimitText = pickLimit ? `/${pickLimit}` : '';
		const itemNumberText =
			selectedValues.length > 0
				? `${selectedValues.length}${pickLimitText} item(s) sélectionné(s)`
				: '';

		setPickedItemInfos(itemNumberText);
	}, [selectedValues, pickLimit]);

	//+ TSX
	return (
		<div className={`selectMultiple-super-container`}>
			{label ? (
				<label
					className='selectMultiple-label'
					htmlFor={label}
					style={{ textAlign: labelPosition }}
				>
					{label}
				</label>
			) : null}

			<div
				className={`selectMultiple-container ${className}`}
				ref={clickRef}
			>
				<div
					className={`${
						disabled && 'selectMultiple-content-wrapper-disabled'
					}
					${
						isPanelVisible
							? 'selectMultiple-content-wrapper-visible'
							: 'selectMultiple-content-wrapper'
					}
					${isValid ? 'selectMultiple-content-wrapper-valid-style' : null}
					`}
				>
					<button
						onClick={openPanel}
						className='selectMultiple-clickable-wrapper'
						disabled={disabled}
					>
						<input
							className='selectMultiple-input-text'
							name={label}
							type='text'
							size={size < 21 ? 21 : size}
							onChange={handleInputChange}
							value={searchValue}
							placeholder={pickedItemInfos || placeholder}
							disabled={disabled}
						/>
					</button>

					{displayButtonActions(isValid, isPanelVisible, searchValue)}
				</div>

				{isPanelVisible ? (
					<div
						className={`selectMultiple-removable-panel ${
							isBeautiful ? 'beautiful-background' : ''
						} `}
					>
						<ItemsBox
							values={selectedValues}
							handleClick={handleDelete}
						></ItemsBox>

						<div className='selectMultiple-list-container'>
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
				) : null}
			</div>
		</div>
	);
};

type TItemsBoxProps = {
	values: string[];
	handleClick: (
		item: string,
		event: React.MouseEvent<HTMLButtonElement>,
	) => void;
};

const ItemsBox: React.FC<TItemsBoxProps> = ({ values, handleClick }) => {
	if (values.length === 0) return null;
	return (
		<div className='selectMultiple-item-box'>
			{values.map((item: string) => {
				return (
					<button
						key={item}
						className='selectMultiple-items-clickable-container'
						onClick={(event) => handleClick(item, event)}
					>
						<div className='selectMultiple-items-wrapper'>
							<span className='selectMultiple-items-text'>
								{item}
							</span>
							<X
								size={18}
								strokeWidth={1.7}
								className='selectMultiple-items-delete-icon'
							/>
						</div>
					</button>
				);
			})}
		</div>
	);
};

type TMultiSelectListProps = {
	data: string[];
	handleClick: (
		event: React.MouseEvent<HTMLButtonElement>,
		item: string,
	) => void;
};
// Virtuoso large list able to display more than 1000 items
const LargeList: React.FC<TMultiSelectListProps> = ({ data, handleClick }) => {
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
			className='selectMultiple-item-list'
			style={{
				height: `${size < 13 ? size * 24 : 300}px`,
			}}
			totalCount={data.length}
			itemContent={itemContent}
		/>
	);
};

// Tiny list used to display less than 1000 items
const TinyList: React.FC<TMultiSelectListProps> = ({ data, handleClick }) => {
	return (
		<ul className='selectMultiple-item-list'>
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
			className='selectMultiple-clickable-items'
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
