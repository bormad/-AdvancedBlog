import styles from './ArticleListItem.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import {
	Article,
	ArticleBlockType,
	ArticleTextBlock,
	ArticleView
} from '../../model/types/article';
import { Button, Text } from '../../../../shared/ui';
import { Icon } from '../../../../shared/ui/Icon/Icon';
import EyeIcon from '../../../../shared/assets/icons/eye-20-20.svg';
import { Card } from '../../../../shared/ui/Card/Card';
import { Avatar } from '../../../../shared/ui/Avatar/Avatar';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';

interface ArticleListItemProps {
	className?: string;
	article: Article;
	view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
	const { className, article, view } = props;
	const navigate = useNavigate();

	const onOpenArticle = useCallback(() => {
		navigate(RoutePath.article_details + article.id);
	}, [navigate, article.id]);

	if (view === ArticleView.BIG) {
		const textBlock = article.blocks.find(
			(block) => block.type === ArticleBlockType.TEXT
		) as ArticleTextBlock;
		return (
			<div
				className={classNames(styles.ArticleListItem, {}, [
					className,
					styles[view]
				])}
			>
				<Card>
					<div className={styles.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text text={article.user.username} className={styles.username} />
						<Text text={article.createdAt} className={styles.date} />
					</div>
					<Text title={article.title} className={styles.title} />
					<Text text={article.type.join(', ')} className={styles.types} />
					<img src={article.img} alt={article.title} className={styles.img} />
					{textBlock && (
						<ArticleTextBlockComponent
							block={textBlock}
							className={styles.textBlock}
						/>
					)}
					<div className={styles.footer}>
						<Button onClick={onOpenArticle}>Читать далее...</Button>
						<Text text={String(article.views)} className={styles.view} />
						<Icon Svg={EyeIcon} />
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
			<Card className={styles.card} onClick={onOpenArticle}>
				<div className={styles.imageWrapper}>
					<img alt={article.title} src={article.img} className={styles.img} />
					<Text text={article.createdAt} className={styles.date} />
				</div>
				<div className={styles.infoWrapper}>
					<Text text={article.type.join(', ')} className={styles.types} />
					<Text text={String(article.views)} className={styles.view} />
					<Icon Svg={EyeIcon} />
				</div>
				<Text text={article.title} className={styles.title} />
			</Card>
		</div>
	);
});

ArticleListItem.displayName = 'ArticleListItem';
