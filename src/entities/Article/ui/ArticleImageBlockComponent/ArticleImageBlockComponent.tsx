import styles from './ArticleImageBlockComponent.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleImageBlock } from '../../model/types/article';
import { Text } from '../../../../shared/ui';
import { TextAlign } from '../../../../shared/ui/Text/Text';
interface ArticleImageBlockComponentProps {
	className?: string;
	block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
	({ className, block }: ArticleImageBlockComponentProps) => {
		return (
			<div
				className={classNames(styles.articleImageBlockComponent, {}, [
					className
				])}
			>
				<img src={block.src} className={styles.img} alt={block.title} />
				{block.title && <Text text={block.title} align={TextAlign.CENTER} />}
			</div>
		);
	}
);

ArticleImageBlockComponent.displayName = 'ArticleImageBlockComponent';
