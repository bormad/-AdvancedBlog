import styles from './ArticleDetailsPage.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleDetails } from '../../../../entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Text } from '../../../../shared/ui';
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
import { AddCommentForm } from '../../../../features/addCommentForm';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsComments: articleDetailsCommentsReducer
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addCommentForArticle(text));
		},
		[dispatch]
	);

	const onBackToList = useCallback(() => {
		navigate('/articles');
	}, [navigate]);

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
				<Button onClick={onBackToList}>Назад к списку</Button>
				<ArticleDetails id={id} />
				<Text title='Комментарии' className={styles.commentTitle} />
				<AddCommentForm onSendComment={onSendComment} />
				<CommentList isLoading={commentsIsLoading} comments={comments} />
			</div>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
