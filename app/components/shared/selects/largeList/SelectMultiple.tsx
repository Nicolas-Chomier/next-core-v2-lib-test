// React core
import React, { useEffect, useRef, useState } from 'react';
// External modules / Third-party libraries
import { ChevronDown, ChevronUp, XCircle } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
// Local components
// Hooks and utilities
import { useOnClickOutside } from '@/app/hooks/useOnClickOutside';
import { capitalize } from '@/app/functions/capitalize';
// Configuration
import {
	ICON_SIZE_M,
	ICON_STROKE_M,
	STANDARD_COLOR_DANGER,
} from '@/config/constantes';
// Styles
import styles from './LargeListSelect.module.css';

type TSelectMultipleProps = {
	field: any;
	contentToDisplay: string[];
	placeHolder?: string;
};

export const SelectMultiple = ({
	field,
	contentToDisplay = ['...'],
	placeHolder,
}: TSelectMultipleProps) => {
	// State and references for display and interaction management
	const [panelVisibility, setPanelVisibility] = useState(false);
	const listRef = useRef<string[]>([]);
	const containerRef = useRef(null);

	// Hook to manage clicks outside the component and close the drop-down menu
	useOnClickOutside(containerRef, () => setPanelVisibility(false));

	// Functions for deleting, resetting and selecting items in the list
	const handleDelete = (value: string) => {
		listRef.current = listRef.current.filter((item) => item !== value);
		field.onChange([...listRef.current]);
	};
	const handleReset = () => {
		field.onChange(null), (listRef.current = []);
		setPanelVisibility(false);
	};
	const handleSelect = (item: string) => {
		listRef.current.push(item);
		field.onChange([...listRef.current]);
	};
	const handleExpand = () => {
		setPanelVisibility(!panelVisibility);
	};

	// Effect to reset the list reference when modifying the field
	useEffect(() => {
		if (!field.value) {
			listRef.current = [];
		}
	}, [field.value]);

	// JSX
	return (
		<div className={styles.container} ref={containerRef}>
			<div className={styles.trigger}>
				{!field.value || field.value.length === 0 ? (
					<div
						className={styles.placeHolder}
						onClick={() => setPanelVisibility(!panelVisibility)}
					>
						{placeHolder || capitalize(field.name)}
					</div>
				) : null}
				<BadgeDisplayer field={field} handleClick={handleDelete} />
				<ResetButton field={field} handleClick={handleReset} />
				<ExpandPanelSwitch
					toggle={panelVisibility}
					handleClick={handleExpand}
				/>
			</div>

			{panelVisibility ? (
				<div className={` ${styles.large_list_wrapper}`}>
					<LargeList
						content={contentToDisplay}
						handleClick={handleSelect}
					></LargeList>
				</div>
			) : null}
		</div>
	);
};

// BadgeDisplayer sub-component to display badges for selected items
type TBadgeDisplayerProps = {
	field: any;
	handleClick: (item: string) => void;
};
const BadgeDisplayer = ({ field, handleClick }: TBadgeDisplayerProps) => {
	if (!Array.isArray(field?.value) || field?.value.length === 0) {
		return null;
	}

	return (
		<div className={styles.badge_wrapper}>
			{field.value.map((item: string, index: number) => (
				<span
					key={`Badge-${index}`}
					onClick={() => handleClick(item)}
					className={styles.badge}
				>
					{capitalize(item.substring(0, 4) + '...')}
				</span>
			))}
		</div>
	);
};

// ResetButton subcomponent to provide a reset button
type TResetButtonProps = {
	field: { name: string; value: string[]; onChange: (value: string) => void };
	handleClick: () => void;
};
const ResetButton = ({ field, handleClick }: TResetButtonProps) => {
	return (
		<button onClick={() => handleClick()} className={styles.reset_button}>
			{!field.value || field.value.length === 0 ? null : (
				<XCircle
					size={ICON_SIZE_M}
					strokeWidth={ICON_STROKE_M}
					color={STANDARD_COLOR_DANGER}
				/>
			)}
		</button>
	);
};

// ExpandPanelSwitch sub-component to manage drop-down panel display
type TExpandPanelSwitchProps = {
	toggle: boolean;
	handleClick: () => void;
};
const ExpandPanelSwitch = ({
	toggle,
	handleClick,
}: TExpandPanelSwitchProps) => {
	return (
		<div className={styles.toggle_switch} onClick={() => handleClick()}>
			{toggle ? (
				<ChevronUp size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
			) : (
				<ChevronDown size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
			)}
		</div>
	);
};

// LargeList subcomponent to display the list of items with Virtuoso
type TLargeListProps = {
	content: any;
	handleClick: (item: string) => void;
};
const LargeList = ({ content, handleClick }: TLargeListProps) => {
	const size = content.length;

	return (
		<Virtuoso
			className={styles.large_list_shape}
			style={{
				height: `${size <= 8 ? size * 36.8 : 300}px`,
			}}
			totalCount={size}
			itemContent={(index) => {
				const item = content[index];
				return (
					<div
						key={index}
						onClick={() => {
							handleClick(item);
						}}
						className={styles.large_list_item}
					>
						{item}
					</div>
				);
			}}
		/>
	);
};
