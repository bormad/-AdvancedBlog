import styles from './ArticleListItem.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleView } from '../../model/types/article';
import { Card } from '../../../../shared/ui/Card/Card';
import { Skeleton } from '../../../../shared/ui/Skeleton/Skeleton';

interface ArticleListItemSkeleton {
	className?: string;
	view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
	(props: ArticleListItemSkeleton) => {
		const { className, view } = props;

		if (view === ArticleView.BIG) {
			return (
				<div
					className={classNames(styles.ArticleListItem, {}, [
						className,
						styles[view]
					])}
				>
					<Card>
						<div className={styles.header}>
							<Skeleton height={30} width={30} border='50%' />
							<Skeleton width={150} height={16} className={styles.username} />
							<Skeleton width={150} height={16} className={styles.date} />
						</div>
						<Skeleton width={250} height={24} className={styles.title} />
						<Skeleton height={200} className={styles.img} />
						<div className={styles.footer}>
							<Skeleton height={36} width={200} />
						</div>
					</Card>
				</div>
			);
		}

		return (
			<div
				className={classNames(styles.ArticleListItem, {}, [
					className,
					styles[view]
				])}
			>
				<Card className={styles.card}>
					<div className={styles.imageWrapper}>
						<Skeleton width={200} height={200} className={styles.img} />
					</div>
					<div className={styles.infoWrapper}>
						<Skeleton width={130} height={16} />
					</div>
					<Skeleton width={150} height={16} className={styles.title} />
				</Card>
			</div>
		);
	}
);

ArticleListItemSkeleton.displayName = 'ArticleListItemSkeleton';
