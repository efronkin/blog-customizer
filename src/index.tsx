import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleFormState, setArticleFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const resetState = () => {
		setArticleState(defaultArticleState);
		setArticleFormState(defaultArticleState);
	};

	const setState = () => {
		setArticleState(articleFormState);
	};

	const handleFontChange = (newState: ArticleStateType) => {
		setArticleFormState(newState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onFormChange={handleFontChange}
				currentState={articleFormState}
				onReset={resetState}
				onApply={setState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
