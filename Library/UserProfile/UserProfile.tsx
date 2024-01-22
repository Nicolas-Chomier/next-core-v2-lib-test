// React core
import React, { useCallback, useEffect, useState } from 'react';
// Styles
import './UserProfile.css';

type TUserProfileProps = {
	imagePath: string;
	fallBackPath: string;
	textTop?: string;
	textBottom?: string;
	isBeautiful?: boolean;
	animation?: boolean;
	className?: string;
};

export const UserProfile: React.FC<TUserProfileProps> = ({
	imagePath,
	fallBackPath,
	textTop = 'Name',
	textBottom = 'Rank',
	isBeautiful = false,
	animation = true,
	className = '',
}) => {
	// State for managing the deployed view of the profile
	const [isDeployed, setIsDeployed] = useState(false);
	// State for managing the current image URL
	const [currentImage, setCurrentImage] = useState(imagePath);

	// Update the image URL whenever the imagePath prop changes
	useEffect(() => {
		setCurrentImage(imagePath);
	}, [imagePath]);

	// Extract the first letter from the textTop string for use as an alt text
	const getFirstLetter = useCallback((text: string) => {
		return text.charAt(0).toUpperCase();
	}, []);

	return (
		<div
			className={`userProfile-container ${
				isBeautiful ? 'beautiful-background' : ''
			} ${className} `}
		>
			<img
				src={currentImage}
				alt={getFirstLetter(textTop)}
				width={'38'}
				height={'38'}
				loading={'lazy'}
				onClick={() => setIsDeployed(!isDeployed)}
				onError={() => setCurrentImage(fallBackPath)}
				className='userProfile-picture'
			></img>

			<div
				className={`userProfile-text-wrapper ${
					isDeployed ? 'userProfile-text-wrapper-deploy' : ''
				}`}
			>
				{isDeployed ? (
					<>
						<p className={'userProfile-text-top'}>{textTop}</p>
						<p
							className={`userProfile-text-bot ${
								animation
									? 'userProfile-text-bot-animation'
									: ''
							}`}
						>
							{textBottom}
						</p>
					</>
				) : null}
			</div>
		</div>
	);
};
