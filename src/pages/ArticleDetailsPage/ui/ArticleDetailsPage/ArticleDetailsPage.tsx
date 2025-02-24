import styles from './ArticleDetailsPage.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { ArticleDetails } from '../../../../entities/Article';
import { useParams } from 'react-router-dom';
import { Text } from '../../../../shared/ui';
import { CommentList } from '../../../../entities/Comment';
import {
	DynamicModuleLoader,
	ReducersList
} from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
	articleDetailsCommentsReducer,
	getArticleComments
} from '../../model/slice/articleDetailsCommentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentByArticleId } from '../../model/services/fetchCommentByArticleId/fetchCommentByArticleId';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsComments: articleDetailsCommentsReducer
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

	useEffect(() => {
		dispatch(fetchCommentByArticleId(id));
	}, [dispatch, id]);

	if (!id) {
		return (
			<div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
				Статья не найдена
			</div>
		);
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
				<ArticleDetails id={id} />
				<Text title='Комментарии' className={styles.commentTitle} />
				<CommentList isLoading={commentsIsLoading} comments={comments} />
			</div>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
