import styles from './ArticleCodeBlockComponent.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleCodeBlock } from '../../model/types/article';
import { Code } from '../../../../shared/ui/Code/Code';

interface ArticleCodeBlockComponentProps {
	className?: string;
	block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
	({ className, block }: ArticleCodeBlockComponentProps) => {
		return (
			<div
				className={classNames(styles.ArticleCodeBlockComponent, {}, [
					className
				])}
			>
				<Code text={block.code} />
			</div>
		);
	}
);

ArticleCodeBlockComponent.displayName = 'ArticleCodeBlockComponent';
