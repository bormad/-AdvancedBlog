import styles from './ArticleList.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo } from 'react';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView;
}

export const ArticleList = memo((props: ArticleListProps) => {
	const { className, articles, isLoading, view = ArticleView.BIG } = props;

	if (isLoading) {
		return (
			<div
				className={classNames(styles.articleList, {}, [
					className,
					styles[view]
				])}
			>
				{new Array(view === ArticleView.SMALL ? 9 : 3)
					.fill(0)
					.map((item, index) => (
						<ArticleListItemSkeleton
							key={index}
							view={view}
							className={styles.card}
						/>
					))}
			</div>
		);
	}

	const renderArticle = (article: Article) => {
		return (
			<ArticleListItem
				view={view}
				article={article}
				className={styles.card}
				key={article.id}
			/>
		);
	};

	return (
		<div
			className={classNames(styles.articleList, {}, [className, styles[view]])}
		>
			{articles.length > 0 ? articles.map(renderArticle) : null}
		</div>
	);
});

ArticleList.displayName = 'ArticleList';
