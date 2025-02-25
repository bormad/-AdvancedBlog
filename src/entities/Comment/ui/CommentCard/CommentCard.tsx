import styles from './CommentCard.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo } from 'react';
import { Comment } from '../../model/types/comment';
import { Avatar } from '../../../../shared/ui/Avatar/Avatar';
import { AppLink, Text } from '../../../../shared/ui';
import { Skeleton } from '../../../../shared/ui/Skeleton/Skeleton';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';

interface CommentCardProps {
	className?: string;
	comment: Comment;
	isLoading?: boolean;
}

export const CommentCard = memo(
	({ className, comment, isLoading }: CommentCardProps) => {
		console.log(comment.user);
		if (isLoading) {
			return (
				<div className={classNames(styles.commentCard, {}, [className])}>
					<div className={styles.header}>
						<Skeleton width={30} height={30} border='50%' />
						<Skeleton height={16} width={100} className={styles.username} />
					</div>
					<Skeleton width={'100%'} height={50} className={styles.text} />
				</div>
			);
		}

		return (
			<div className={classNames(styles.commentCard, {}, [className])}>
				<AppLink
					to={`${RoutePath.profile}${comment.user.id}`}
					className={styles.header}
				>
					{comment.user.avatar ? (
						<Avatar size={30} src={comment.user.avatar} />
					) : (
						<Skeleton width={30} height={30} border='50%' />
					)}
					<Text className={styles.username} title={comment.user.username} />
				</AppLink>
				<Text className={styles.text} text={comment.text} />
			</div>
		);
	}
);

CommentCard.displayName = 'CommentCard';
