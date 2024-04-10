'use client';
// React core
import { Frame } from '@/app/components/primitifs/Frame';
import React, { useState } from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
import styles from './PageComponentTests.module.css';
import { InputText } from '@/app/components/primitifs/InputText';
import { IconButton } from '@/app/components/primitifs/IconButton';
import { Eraser, Flame, PenLine, PenTool, PencilLine } from 'lucide-react';
import { LabelWrapper } from '@/app/components/primitifs/LabelWrapper';
import { Flex } from '@radix-ui/themes';

const VALIDER = false;
const ERROR = false;

const PageComponentTests = () => {
	const [test, setTest] = useState('');

	const handleErase = () => {
		setTest('');
	};

	console.log(test);
	return (
		<div className={styles.container}>
			<Frame>
				<LabelWrapper label={'label'} labelPosition={'start'}>
					<Flex
						direction={'row'}
						align={'center'}
						justify={'center'}
						gap={'2'}
					>
						<InputText
							name={'aaa'}
							placeholder={'my text here !'}
							isDisable={false}
							isRequired={false}
							value={test}
							isValid={VALIDER}
							isError={ERROR}
							onChange={setTest}
						></InputText>

						<IconButton
							ariaLabel={'icon'}
							onClick={handleErase}
							isLoading={false}
							isValid={VALIDER}
							isError={ERROR}
							isTouched={!!test}
							isDisable={false}
							isColored={true}
						>
							<PencilLine
								size={'24px'}
								strokeWidth={1.5}
								color='rgb(238, 238, 238)'
							/>
						</IconButton>
					</Flex>
				</LabelWrapper>
			</Frame>
			<Frame>
				<Flex
					direction={'row'}
					align={'center'}
					justify={'center'}
					gap={'2'}
				>
					<InputText
						name={'aaa'}
						placeholder={'my text here !'}
						isDisable={false}
						isRequired={false}
						value={test}
						isValid={VALIDER}
						isError={ERROR}
						onChange={setTest}
					></InputText>

					<IconButton
						ariaLabel={'icon'}
						onClick={handleErase}
						isLoading={false}
						isValid={VALIDER}
						isError={ERROR}
						isTouched={!!test}
						isDisable={false}
						isColored={true}
					>
						<PencilLine
							size={'24px'}
							strokeWidth={1.5}
							color='rgb(238, 238, 238)'
						/>
					</IconButton>
				</Flex>
			</Frame>
		</div>
	);
};
export default PageComponentTests;
