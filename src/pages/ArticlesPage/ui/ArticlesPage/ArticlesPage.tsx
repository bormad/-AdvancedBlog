import styles from './ArticlesPage.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleList } from '../../../../entities/Article/ui/ArticleList/ArticleList';
import {
	DynamicModuleLoader,
	ReducersList
} from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
	articlePageAction,
	articlesPageReducer,
	getArticles
} from './model/slices/articlePageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { fetchArticleList } from './model/services/fetchArticlesList';
import {
	getArticlesPageError,
	getArticlesPageIsLoading,
	getArticlesPageView
} from './model/selectors/articlesPageSelectors';
import { ArticleViewSelector } from '../../../../entities/Article/ui/ArticleViewSelector/ArticleViewSelector';
import { ArticleView } from '../../../../entities/Article/model/types/article';
interface ArticlesPageProps {
	className?: string;
}
const reducers: ReducersList = {
	articlesPage: articlesPageReducer
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesPageIsLoading);
	const error = useSelector(getArticlesPageError);
	const view = useSelector(getArticlesPageView);

	const onChangeView = useCallback(
		(view: ArticleView) => {
			dispatch(articlePageAction.setView(view));
		},
		[dispatch]
	);

	useEffect(() => {
		dispatch(fetchArticleList());
		dispatch(articlePageAction.initState());
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(styles.ArticlesPage, {}, [className])}>
				<ArticleViewSelector view={view} onViewClick={onChangeView} />
				<ArticleList isLoading={isLoading} articles={articles} view={view} />
			</div>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
