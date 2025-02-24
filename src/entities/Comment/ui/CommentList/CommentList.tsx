import styles from './CommentList.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo } from 'react';
import { Comment } from '../../model/types/comment';
import { Text } from '../../../../shared/ui';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
	className?: string;
	comments?: Comment[];
	isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
	const { className, comments, isLoading } = props;
	console.log(comments, 'comments');
	return (
		<div className={classNames(styles.commentList, {}, [className])}>
			{comments?.length ? (
				comments.map((comment) => (
					<CommentCard
						isLoading={isLoading}
						className={styles.comment}
						comment={comment}
						key={comment.id}
					/>
				))
			) : (
				<Text text='Комментарии отсутствуют' />
			)}
		</div>
	);
});

CommentList.displayName = 'CommentList';
