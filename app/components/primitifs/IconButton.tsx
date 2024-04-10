// React core
import React, { useState, useEffect, ReactNode, HTMLAttributes } from 'react';
// External modules / Third-party libraries
// Local components
import { DeleteIcon } from './DeleteIcon';
// Hooks and utilities
// Configuration
// Styles
import styles from './IconButton.module.css';
import { ValidIcon } from './ValidIcon';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
	className?: string;
	isValid?: boolean;
	isDisable?: boolean;
	isLoading?: boolean;
	isError?: boolean;
	isTouched?: boolean;
	isColored?: boolean;
	ariaLabel: string;
	onClick?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
	children,
	className,
	isValid = false,
	isDisable = false,
	isLoading = false,
	isError = false,
	isTouched = false,
	isColored = false,

	ariaLabel,
	onClick,
}) => {
	// Classes CSS passées par default
	const defaultClassName = className ?? styles.inconButton;

	//
	const renderContent = () => {
		if (isDisable) return null;
		if (isLoading) return <span className={styles.loader} />;
		if (isError) return <DeleteIcon />;
		if (isTouched) return <DeleteIcon />;

		return children;
	};
	return (
		<button
			type='button'
			className={defaultClassName}
			onClick={onClick}
			disabled={isDisable}
			aria-label={ariaLabel}
			{...(isColored && { 'data-iscolored': isColored })}
			{...(isLoading && { 'data-isloading': isLoading })}
			{...(isValid && { 'data-isvalid': isValid })}
			{...(isError && { 'data-iserror': isError })}
			{...(isTouched && { 'data-istouched': isTouched })}
			{...(isDisable && { 'aria-disabled': true })}
		>
			{renderContent()}
		</button>
	);
};
