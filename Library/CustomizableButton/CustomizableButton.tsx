// React core
import React, { ReactNode, useCallback, useState } from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
// Styles
import './CustomizableButton.css';
import { Power } from 'lucide-react';

type TCustomizableButtonProps = {
	children?: [ReactNode, ReactNode] | ReactNode;
	disabled?: boolean;
	className?: string;
	handleClick: ({ ...props }) => void;
};

export const CustomizableButton: React.FC<TCustomizableButtonProps> = ({
	children,
	disabled = false,
	className,
	handleClick,
}) => {
	const [toggleStatus, setToggleStatus] = useState(false);

	const childrenManagement = useCallback(
		(children: any) => {
			let processedChildren = React.Children.toArray(children);

			if (processedChildren.length === 0) {
				return (
					<Power
						size={24}
						strokeWidth={1.7}
						className='customizableButton-power-icon'
					/>
				);
			}
			if (processedChildren.length === 1) {
				return children;
			}

			if (processedChildren.length === 2) {
				return toggleStatus
					? processedChildren[0]
					: processedChildren[1];
			}
		},
		[toggleStatus],
	);

	const handleWrapped = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();

			if (handleClick) {
				setToggleStatus(!toggleStatus);
				handleClick(event);
			}
		},
		[toggleStatus, handleClick],
	);

	return (
		<button
			disabled={disabled}
			className={`customizableButton-mandatory-class
			${className ?? 'customizableButton-button'}`}
			onClick={handleWrapped}
		>
			{childrenManagement(children)}
		</button>
	);
};
