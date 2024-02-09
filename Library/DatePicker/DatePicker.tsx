// React core
import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
} from 'react';
// External modules / Third-party libraries
import {
	CalendarCheck,
	CalendarRange,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	MoreHorizontal,
	X,
} from 'lucide-react';
// Styles
import './DatePicker.css';

const constants = {
	months: [
		'Janvier',
		'Février',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre',
	],

	datePattern: new RegExp(
		'(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/(\\d{4})',
	),
	errorMessage: 'Ordre des dates erroné !',
	limitMessage: 'Dates hors limites !',
	locales: 'fr-FR',
};

const FRAME: React.ReactNode[] = [
	<tr className={'datePicker-calendar-row'} key={'week'}>
		<td
			className={`${'datePicker-calendar-day-text'} ${'datePicker-calendar-cell'}`}
			key={'Lu'}
		>
			Lu
		</td>
		<td
			className={`${'datePicker-calendar-day-text'} ${'datePicker-calendar-cell'}`}
			key={'Ma'}
		>
			Ma
		</td>
		<td
			className={`${'datePicker-calendar-day-text'} ${'datePicker-calendar-cell'}`}
			key={'Me'}
		>
			Me
		</td>
		<td
			className={`${'datePicker-calendar-day-text'} ${'datePicker-calendar-cell'}`}
			key={'Je'}
		>
			Je
		</td>
		<td
			className={`${'datePicker-calendar-day-text'} ${'datePicker-calendar-cell'}`}
			key={'Ve'}
		>
			Ve
		</td>
		<td
			className={`${'datePicker-calendar-day-text'} ${'datePicker-calendar-cell'}`}
			key={'Sa'}
		>
			Sa
		</td>
		<td
			className={`${'datePicker-calendar-day-text'} ${'datePicker-calendar-cell'}`}
			key={'Di'}
		>
			Di
		</td>
	</tr>,
];
const TODAY: string = new Date().toLocaleDateString();

type TDatePickerProps = {
	placeholder?: string;
	label?: [string, string];
	limitDateMin?: number;
	limitDateMax?: number;
	isSubmit?: boolean;
	isValid?: boolean;
	open?: boolean;
	disabled?: boolean;
	size?: 'small' | 'standard';
	isBeautiful?: boolean;
	className?: string;
	onFieldChange: (
		value: [Date | undefined, Date | undefined] | undefined,
	) => void;
};

//+ DATE PICKER (Fr)
export const DatePicker: React.FC<TDatePickerProps> = ({
	placeholder = 'jj/mm/aaaa',
	label,
	limitDateMin,
	limitDateMax,
	isSubmit,
	isValid,
	open = false,
	disabled = false,
	size = 'standard',
	isBeautiful = true,
	className,
	onFieldChange,
}) => {
	const { datePattern, months, errorMessage, limitMessage, locales } =
		constants;
	// State hooks for dates
	const [calendarDate, setCalendarDate] = useState(new Date());
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');
	// Refs & State hooks for logic / animation
	const swapDate = useRef(true); // Refs for alterante date selection
	const [showCalendar, setShowCalendar] = useState(open);
	const [message, setMessage] = useState('');

	const clickRef = useRef(null);

	// Handler for outside clicks to close the calendar
	useClickOutside(clickRef, () => setShowCalendar(false));

	// Function to add / remove years and months
	const changeMonth = (
		event: React.MouseEvent<HTMLButtonElement>,
		delta: number,
	) => {
		setCalendarDate(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1),
		);
		event.preventDefault();
	};

	const changeYear = (
		event: React.MouseEvent<HTMLButtonElement>,
		delta: number,
	) => {
		setCalendarDate(
			(prev) => new Date(prev.getFullYear() + delta, prev.getMonth(), 1),
		);
		event.preventDefault();
	};

	// Function to switch calendar icon according form status
	const calendarIcon = (isValid: boolean | undefined, format: string) => {
		if (format === 'small')
			return (
				<MoreHorizontal
					size={12}
					strokeWidth={1.4}
					className='datePicker-input-separator'
				/>
			);
		if (isValid) {
			return (
				<CalendarCheck
					size={19}
					strokeWidth={1.8}
					className='datePicker-middle-icon-valid'
				/>
			);
		}
		return (
			<CalendarRange
				size={18}
				strokeWidth={1.5}
				className='datePicker-middle-icon'
			/>
		);
	};

	// Reset handler for clearing dates
	const handleReset = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setCalendarDate(new Date());
			setStartDate('');
			setEndDate('');
			setMessage('');
			onFieldChange(undefined);
			swapDate.current = true;
			event.preventDefault();
		},
		[onFieldChange],
	);

	// Handler to update the start date and check against the minimum allowed date
	const handleChangeStartDate = useCallback(
		(value: string): void => {
			// Check if the input value matches the date pattern
			if (datePattern.test(value)) {
				const newDate = stringToDate(value);
				// Check if there is a minimum limit date defined
				if (limitDateMin) {
					const dateLimit = dateAddDays(limitDateMin);
					// If the new date is after the minimum limit, update the calendar and start date
					if (dateLimit < newDate) {
						setCalendarDate(newDate);
						setStartDate(value);
					} else {
						// If the new date does not meet the minimum limit, show a limit message and reset start date
						setMessage(limitMessage);
						setStartDate(' ');
					}
				} else {
					// If no minimum limit is defined, just update the calendar and start date
					setCalendarDate(newDate);
					setStartDate(value);
				}
			} else {
				setStartDate(value);
			}
		},
		[datePattern, limitDateMin, limitMessage],
	);

	// Handler to update the end date and check against the maximum allowed date
	const handleChangeEndDate = useCallback(
		(value: string): void => {
			// Check if the input value matches the date pattern
			if (datePattern.test(value)) {
				const newDate = stringToDate(value);
				if (limitDateMax) {
					const dateLimit = dateAddDays(limitDateMax);
					// Check if the new date is before the maximum limit date
					if (newDate < dateLimit) {
						// If the new date meets the condition, update the calendar and end date
						setCalendarDate(newDate);
						setEndDate(value);
					} else {
						// If the new date exceeds the maximum limit, show a limit message and reset end date
						setMessage(limitMessage);
						setEndDate(' ');
					}
				} else {
					// If no maximum limit is defined, just update the calendar and end date
					setCalendarDate(newDate);
					setEndDate(value);
				}
			} else {
				setEndDate(value);
			}
		},
		[datePattern, limitDateMax, limitMessage],
	);

	// Handler for selecting a date from the calendar
	const handleClick = (newDate: Date) => {
		// Check the state of swapDate to determine if we're setting the start or end date
		if (swapDate.current) {
			// If swapDate is true, set the selected date as the start date
			setStartDate(newDate.toLocaleDateString(locales));
			swapDate.current = false; // Set swapDate to false for the next selection
		} else {
			// If swapDate is false, set the selected date as the end date
			setEndDate(newDate.toLocaleDateString(locales));
			swapDate.current = true; // Set swapDate to true for the next selection
		}
	};

	const openPanel = (event: React.MouseEvent<HTMLButtonElement>) => {
		setShowCalendar(true);
		event.preventDefault();
	};

	// Effect to handle date validation
	useEffect(() => {
		// Check if both dates are present
		if (datePattern.test(startDate) && datePattern.test(endDate)) {
			const start = stringToDate(startDate);
			const end = stringToDate(endDate);
			if (start > end) {
				// Set an error message if the start date is after the end date
				setMessage(errorMessage);
			} else {
				// Clear the error message and execute onDateSelect if the dates are valid
				setMessage('');
				if (start < end) {
					onFieldChange([start, end]);
				}
			}
		}
	}, [startDate, endDate, errorMessage, datePattern, onFieldChange]);

	// Effect to clean component after form validation
	useEffect(() => {
		if (isSubmit) {
			setCalendarDate(new Date());
			setStartDate('');
			setEndDate('');
			setMessage('');
			onFieldChange(undefined);
			swapDate.current = true;
		}
	}, [isSubmit, onFieldChange]);

	//+ TSX
	return (
		<div className={`datePicker-super-container`}>
			{label ? (
				<div className='datePicker-label-wrapper'>
					<span className={`datePicker-label-${size}`}>
						{label[0]}
					</span>
					<span className={`datePicker-label-${size}`}>
						{label[1]}
					</span>
				</div>
			) : null}

			<div
				ref={clickRef}
				className={`datePicker-container datePicker-format-${size} ${className}`}
			>
				<button
					className={`datePicker-inputs-wrapper ${
						isValid ? 'datePicker-inputs-wrapper-valid-style' : null
					}`}
					disabled={disabled}
					onClick={openPanel}
				>
					<Input
						placeholder={placeholder}
						initialValue={startDate}
						disabled={disabled}
						onValueChange={handleChangeStartDate}
					></Input>

					{calendarIcon(isValid, size)}

					<Input
						placeholder={placeholder}
						initialValue={endDate}
						disabled={disabled}
						onValueChange={handleChangeEndDate}
					></Input>
				</button>

				{showCalendar ? (
					<div
						className={`datePicker-panel ${
							isBeautiful ? 'beautiful-background' : ''
						} `}
					>
						<Displayer
							monthList={months}
							date={calendarDate}
							message={message}
						></Displayer>

						<Calendar
							limitDateMin={limitDateMin}
							limitDateMax={limitDateMax}
							targetDate={calendarDate}
							startDate={startDate}
							endDate={endDate}
							handleClick={handleClick}
						></Calendar>

						<div className='datePicker-button-wrapper'>
							<button
								className='datePicker-action-button'
								onClick={(e) => changeYear(e, -1)}
							>
								<ChevronsLeft size={22} strokeWidth={1.4} />
							</button>
							<button
								className='datePicker-action-button'
								onClick={(e) => changeMonth(e, -1)}
							>
								<ChevronLeft size={25} strokeWidth={1.3} />
							</button>

							<button
								className='datePicker-reset-button'
								onClick={handleReset}
							>
								{size === 'small' ? (
									<X
										size={19}
										strokeWidth={1.3}
										className='datePicker-reset-button-content'
									/>
								) : (
									<div className='datePicker-reset-button-content'>
										Reset
									</div>
								)}
							</button>
							<button
								className='datePicker-action-button'
								onClick={(e) => changeMonth(e, 1)}
							>
								<ChevronRight size={25} strokeWidth={1.3} />
							</button>
							<button
								className='datePicker-action-button'
								onClick={(e) => changeYear(e, 1)}
							>
								<ChevronsRight size={22} strokeWidth={1.4} />
							</button>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

type TCalendarProps = {
	limitDateMin?: number;
	limitDateMax?: number;
	targetDate: Date;
	startDate: string;
	endDate: string;
	handleClick: (date: Date) => void;
};

const Calendar: React.FC<TCalendarProps> = ({
	limitDateMin,
	limitDateMax,
	targetDate,
	startDate,
	endDate,
	handleClick,
}) => {
	// Function which determine which css class assign to date in calendar
	const getCellDateInfo = useCallback(
		(cellDate: Date) => {
			const isToday = cellDate.toLocaleDateString() === TODAY;

			const convertedCellDate = dateToSecond(cellDate);
			const convertedStartDate = stringToSecond(startDate);
			const convertedEndDate = stringToSecond(endDate);

			const isDayUnderLimitDateMin =
				limitDateMin && cellDate < dateAddDays(limitDateMin);
			const isDayAboveLimitDateMax =
				limitDateMax && cellDate > dateAddDays(limitDateMax);
			const isStartDate =
				startDate && convertedCellDate === convertedStartDate;
			const isEndDate = endDate && convertedCellDate === convertedEndDate;
			const isBetweenDates =
				convertedCellDate > convertedStartDate &&
				convertedCellDate < convertedEndDate;

			return {
				isToday,
				isDayUnderLimitDateMin,
				isDayAboveLimitDateMax,
				isStartDate,
				isEndDate,
				isBetweenDates,
			};
		},
		[startDate, endDate, limitDateMin, limitDateMax],
	);

	// Function which generate the day cell calendar (<td>)
	const generateDayCell = useCallback(
		(
			week: number,
			day: number,
			date: number,
			year: number,
			month: number,
		) => {
			const cellDate = new Date(year, month, date);
			const cellDateInfo = getCellDateInfo(cellDate);

			const cellClasses = `datePicker-calendar-cell datePicker-calendar-dates ${
				cellDateInfo.isStartDate ? 'datePicker-calendar-start-date' : ''
			} ${cellDateInfo.isEndDate ? 'datePicker-calendar-end-date' : ''} ${
				cellDateInfo.isBetweenDates
					? 'datePicker-calendar-date-between'
					: ''
			} ${cellDateInfo.isToday ? 'datePicker-calendar-today' : ''}`;

			if (
				cellDateInfo.isDayUnderLimitDateMin ||
				cellDateInfo.isDayAboveLimitDateMax
			) {
				return (
					<td
						key={`${week}-${day}`}
						className={
							'datePicker-calendar-cell datePicker-calendar-dates-none'
						}
					>
						{date}
					</td>
				);
			} else {
				return (
					<td
						key={`${week}-${day}`}
						onClick={() => handleClick(cellDate)}
						className={cellClasses}
					>
						{date}
					</td>
				);
			}
		},
		[handleClick, getCellDateInfo],
	);

	// Function which build the calendar to stack day rows in render array
	const generateWeekRow = useCallback(
		(
			week: number,
			date: number,
			daysInMonth: number,
			firstDayOfMonth: number,
			year: number,
			month: number,
		) => {
			const weekRow = [];
			for (let day = 1; day < 8; day++) {
				if (
					(week === 0 && day < firstDayOfMonth) ||
					date > daysInMonth
				) {
					weekRow.push(
						<td
							key={`${day}`}
							className='datePicker-calendar-cell'
						></td>,
					);
				} else {
					weekRow.push(generateDayCell(week, day, date, year, month));
					date++;
				}
			}
			return weekRow;
		},
		[generateDayCell],
	);

	// Calendar componenent
	const generateCalendar = useMemo(() => {
		const calendar = [...FRAME];
		const year = targetDate.getFullYear();
		const month = targetDate.getMonth();
		const daysInMonth = getDaysInMonth(year, month);
		const firstDayOfMonth = new Date(year, month, 1).getDay();
		let date = 1;

		for (let week = 0; week < 5; week++) {
			const weekRow = generateWeekRow(
				week,
				date,
				daysInMonth,
				firstDayOfMonth,
				year,
				month,
			);
			calendar.push(
				<tr key={week} className='datePicker-calendar-row'>
					{weekRow}
				</tr>,
			);
			if (date > daysInMonth) break;
			date += weekRow.filter((cell) => cell.props.children).length;
		}

		return calendar;
	}, [targetDate, generateWeekRow]);

	return (
		<table>
			<tbody>{generateCalendar}</tbody>
		</table>
	);
};

type TInputProps = {
	initialValue: string;
	placeholder: string;
	size?: number;
	disabled?: boolean;
	onValueChange: (value: string) => void;
};

const Input: React.FC<TInputProps> = ({
	initialValue,
	placeholder,
	size = 12,
	disabled = false,
	onValueChange,
}) => {
	const [value, setValue] = useState(initialValue || '');
	// Update local state and notify parent when the initialValue changes
	useEffect(() => {
		setValue(initialValue);
		onValueChange(initialValue);
	}, [initialValue, onValueChange]);

	// Handle changes in the input field
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		onValueChange(event.target.value);
	};

	// Allow only digits in the input
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (/^[a-zA-Z]$/.test(event.key)) {
			event.preventDefault();
		}
	};

	return (
		<input
			className='datePicker-inputs-dates'
			type='text'
			size={size}
			minLength={10}
			maxLength={10}
			onKeyDown={handleKeyDown}
			placeholder={placeholder}
			onChange={handleChange}
			value={value}
			disabled={disabled}
		/>
	);
};

type TDisplayerProps = {
	monthList: string[];
	date: Date;
	message?: string | null;
};

const Displayer: React.FC<TDisplayerProps> = ({ monthList, date, message }) => {
	// Display error message if it exists
	if (message) {
		return <div className='datePicker-error-message'>{message}</div>;
	}

	// Format date for display
	const formattedDate = `${monthList[date.getMonth()]} ${date.getFullYear()}`;

	return <div className='datePicker-displayer'>{formattedDate}</div>;
};

//+ REQUIERED FUNCTIONS
// Transform string like: "dd/mm/yyyy" or Date to number (second)
const dateToSecond = (value: Date): number => {
	return Math.floor(value.getTime() / 1000);
};
//
const getDaysInMonth = (year: number, month: number): number => {
	return 32 - new Date(year, month, 32).getDate();
};
//
const stringToSecond = (value: string): number => {
	const [day, month, year] = value.split('/').map(Number);
	const newDate = new Date(year, month - 1, day);
	return Math.floor(newDate.getTime() / 1000);
};
// Transform string like: "dd/mm/yyyy" to Date object
const stringToDate = (date: string): Date => {
	const [day, month, year] = date.split('/').map(Number);
	return new Date(year, month - 1, day);
};
// Transform number of day to Date
const dateAddDays = (offset: number | undefined): Date => {
	const newDate = new Date();
	offset && newDate.setDate(newDate.getDate() + offset - 1);
	return newDate;
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
