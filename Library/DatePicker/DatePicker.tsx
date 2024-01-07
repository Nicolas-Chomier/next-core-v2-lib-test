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
	limitMessage: 'La date est hors des limites définies !',
	locales: 'fr-FR',
};

const FRAME: React.ReactNode[] = [
	<tr className={'calendar_row'} key={'semaine'}>
		<td className={`${'calendar_day_cell'} ${'cell'}`} key={'Lu'}>
			Lu
		</td>
		<td className={`${'calendar_day_cell'} ${'cell'}`} key={'Ma'}>
			Ma
		</td>
		<td className={`${'calendar_day_cell'} ${'cell'}`} key={'Me'}>
			Me
		</td>
		<td className={`${'calendar_day_cell'} ${'cell'}`} key={'Je'}>
			Je
		</td>
		<td className={`${'calendar_day_cell'} ${'cell'}`} key={'Ve'}>
			Ve
		</td>
		<td className={`${'calendar_day_cell'} ${'cell'}`} key={'Sa'}>
			Sa
		</td>
		<td className={`${'calendar_day_cell'} ${'cell'}`} key={'Di'}>
			Di
		</td>
	</tr>,
];
const TODAY: string = new Date().toLocaleDateString();

type TDatePickerProps = {
	placeholder?: string;
	limitDateMin?: number;
	limitDateMax?: number;
	isSubmit?: boolean;
	isValid?: boolean;
	onFieldChange: (
		value: [Date | undefined, Date | undefined] | undefined,
	) => void;
};

//+++++ DATE PICKER Fr +++++//
export const DatePicker: React.FC<TDatePickerProps> = ({
	placeholder = 'jj/mm/aaaa',
	limitDateMin,
	limitDateMax,
	isSubmit,
	isValid,
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
	const [showCalendar, setShowCalendar] = useState(false);
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
		<div ref={clickRef} className={'datePicker_container'}>
			<button
				className={`${isValid && 'green_border'} ${'inputs_wrapper'}`}
				onClick={openPanel}
			>
				<Input
					placeholder={placeholder}
					initialValue={startDate}
					onValueChange={handleChangeStartDate}
				></Input>
				{isValid ? (
					<CalendarCheck
						size={19}
						strokeWidth={1.4}
						className={'datePicker_input_separator_form_valid'}
					/>
				) : (
					<CalendarRange
						size={19}
						strokeWidth={1.3}
						className={'datePicker_input_separator'}
					/>
				)}

				<Input
					placeholder={placeholder}
					initialValue={endDate}
					onValueChange={handleChangeEndDate}
				></Input>
			</button>
			{showCalendar ? (
				<div className={'datePicker_panel'}>
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

					<div className={'button_panel'}>
						<button
							className={'datePicker_buttons'}
							onClick={(e) => changeYear(e, -1)}
						>
							<ChevronsLeft size={22} strokeWidth={1.4} />
						</button>
						<button
							className={'datePicker_buttons'}
							onClick={(e) => changeMonth(e, -1)}
						>
							<ChevronLeft size={25} strokeWidth={1.3} />
						</button>

						<button
							className={'datePicker_reset_button'}
							onClick={handleReset}
						>
							<div className={'datePicker_reset_text'}>Reset</div>
						</button>
						<button
							className={'datePicker_buttons'}
							onClick={(e) => changeMonth(e, 1)}
						>
							<ChevronRight size={25} strokeWidth={1.3} />
						</button>
						<button
							className={'datePicker_buttons'}
							onClick={(e) => changeYear(e, 1)}
						>
							<ChevronsRight size={22} strokeWidth={1.4} />
						</button>
					</div>
				</div>
			) : null}
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

			const cellClasses = `cell dates ${
				cellDateInfo.isStartDate ? 'calendar_cell_start_date' : ''
			} ${cellDateInfo.isEndDate ? 'calendar_cell_end_date' : ''} ${
				cellDateInfo.isBetweenDates ? 'calendar_cell_between' : ''
			} ${cellDateInfo.isToday ? 'calendar_cell_today' : ''}`;

			if (
				cellDateInfo.isDayUnderLimitDateMin ||
				cellDateInfo.isDayAboveLimitDateMax
			) {
				return (
					<td
						key={`${week}-${day}`}
						className={`${'cell'} ${'out_dates'}`}
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
					weekRow.push(<td key={`${day}`} className={'cell'}></td>);
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

		for (let week = 0; week < 6; week++) {
			const weekRow = generateWeekRow(
				week,
				date,
				daysInMonth,
				firstDayOfMonth,
				year,
				month,
			);
			calendar.push(
				<tr key={week} className={'calendar_row'}>
					{weekRow}
				</tr>,
			);
			if (date > daysInMonth) break;
			date += weekRow.filter((cell) => cell.props.children).length;
		}

		return calendar;
	}, [targetDate, generateWeekRow]);

	return (
		<table className={'calendar_table'}>
			<tbody>{generateCalendar}</tbody>
		</table>
	);
};

type TInputProps = {
	initialValue: string;
	placeholder: string;
	size?: number;
	onValueChange: (value: string) => void;
};

const Input: React.FC<TInputProps> = ({
	initialValue,
	placeholder,
	size = 12,
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
			className={'inputDate'}
			type='text'
			size={size}
			minLength={10}
			maxLength={10}
			onKeyDown={handleKeyDown}
			placeholder={placeholder}
			onChange={handleChange}
			value={value}
		/>
	);
};

type TDisplayerProps = {
	monthList: string[];
	date: Date;
	message?: string | null;
};

const Displayer: React.FC<TDisplayerProps> = ({ monthList, date, message }) => {
	if (message)
		return (
			<div className={'displayer_container_error_message'}>{message}</div>
		);

	return (
		<div className={'displayer_container'}>{`${
			monthList[date.getMonth()]
		} ${date.getFullYear()}`}</div>
	);
};

//* Side functions *//
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