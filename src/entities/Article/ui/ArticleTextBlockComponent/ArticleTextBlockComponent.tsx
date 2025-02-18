import styles from './ArticleTextBlockComponent.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleTextBlock } from '../../model/types/article';
import { Text } from '../../../../shared/ui';

interface ArticleTextBlockComponentProps {
	className?: string;
	block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
	({ className, block }: ArticleTextBlockComponentProps) => {
		return (
			<div
				className={classNames(styles.ArticleTextBlockComponent, {}, [
					className
				])}
			>
				{block.title && <Text title={block.title} className={styles.title} />}
				{block.paragraphs.map((paragraph, index) => (
					<Text key={index} text={paragraph} className={styles.paragraph} />
				))}
			</div>
		);
	}
);

ArticleTextBlockComponent.displayName = 'ArticleTextBlockComponent';
