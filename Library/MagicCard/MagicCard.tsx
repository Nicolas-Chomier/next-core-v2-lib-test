// React core
import React, { ReactNode } from 'react';
// Styles
import './MagicCard.css';

type TMagicCardProps = {
	children: ReactNode;
	isShadow: boolean;
	style?: 'background' | 'border';
	className?: string;
};

export const MagicCard: React.FC<TMagicCardProps> = ({
	children,
	style = undefined,
	isShadow = false,
	className = '',
}) => {
	const styledBackground =
		style === 'background' ? 'magicCard-beautiful-background' : '';
	const styledBorder = style === 'border' ? 'magicCard-styled-border' : '';
	const undefinedStyle = style ? '' : 'magicCard-no-style-selected';
	return (
		<div
			className={`magicCard-container-mandatory-style
			${className || 'magicCard-container'}
			${styledBackground}
			${styledBorder} 
			${undefinedStyle}
			${isShadow ? 'magicCard-shadow-effect' : 'magicCard-shadow-border'}`}
		>
			{children}
		</div>
	);
};
