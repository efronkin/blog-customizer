import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { useState, useEffect, useRef } from 'react';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onFormChange: (state: ArticleStateType) => void;
	currentState: ArticleStateType;
	onReset: () => void;
	onApply: () => void;
};

export const ArticleParamsForm = ({
	onFormChange,
	currentState,
	onReset,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);

	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	const handleReset = () => {
		onReset();
	};

	const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply();
	};

	const handleSelectChange = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		onFormChange({
			...currentState,
			[key]: value,
		});
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						title='Выберите опцию'
						options={fontFamilyOptions}
						selected={currentState.fontFamilyOption}
						placeholder='Выберите шрифт'
						onChange={(option) =>
							handleSelectChange('fontFamilyOption', option)
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={currentState.fontSizeOption}
						onChange={(option) => handleSelectChange('fontSizeOption', option)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={currentState.fontColor}
						placeholder='Выберите цвет шрифта'
						onChange={(option) => handleSelectChange('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={currentState.backgroundColor}
						placeholder='Выберите цвет фона'
						onChange={(option) => handleSelectChange('backgroundColor', option)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={currentState.contentWidth}
						placeholder='Выберите ширину контента'
						onChange={(option) => handleSelectChange('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
