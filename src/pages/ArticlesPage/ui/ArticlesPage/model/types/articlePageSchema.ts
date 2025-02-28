import { EntityState } from '@reduxjs/toolkit';
import { Article } from '../../../../../../entities/Article';
import { ArticleView } from '../../../../../../entities/Article/model/types/article';

export interface articlePageSchema extends EntityState<Article, string> {
	isLoading?: boolean;
	error?: string;

	view: ArticleView;
}
