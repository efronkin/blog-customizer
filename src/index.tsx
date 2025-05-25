import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from './App';

import './styles/index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

// const App = () => {
// 	const [articleState, setArticleState]
// 		= useState<ArticleStateType>(defaultArticleState);

// 	return (
// 		<main
// 			className={styles.main}
// 			style={
// 				{
// 					'--font-family': articleState.fontFamilyOption.value,
// 					'--font-size': articleState.fontSizeOption.value,
// 					'--font-color': articleState.fontColor.value,
// 					'--container-width': articleState.contentWidth.value,
// 					'--bg-color': articleState.backgroundColor.value,
// 				} as CSSProperties
// 			}>
// 			<ArticleParamsForm
// 				articleState={articleState}
// 				setArticleState={setArticleState}
// 			/>
// 			<Article />
// 		</main>
// 	);
// };

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
