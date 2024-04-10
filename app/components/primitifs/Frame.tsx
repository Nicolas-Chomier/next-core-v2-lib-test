// React core
import React, { HTMLAttributes, ReactNode, forwardRef } from 'react';
// External modules / Third-party libraries
// Pas nécessaire pour cet exemple simple
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './Frame.module.css';

interface FrameProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	className?: string;
	isValid?: boolean;
	isLoading?: boolean;
	isError?: boolean;
	isTarget?: boolean;
}

export const Frame = forwardRef<HTMLDivElement, FrameProps>(
	({ children, className = '', isTarget = false, ...rest }, ref) => {
		// Classes CSS passées par default
		const defaultClassName = className || styles.frame;

		return (
			<div
				className={defaultClassName}
				{...(isTarget && { 'data-istarget': isTarget })}
				{...rest}
				ref={ref}
			>
				{children}
			</div>
		);
	},
);

Frame.displayName = 'Frame';
