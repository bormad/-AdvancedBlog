import styles from './Card.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { HTMLAttributes, memo, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
}

export const Card = memo(
	({ className, children, ...otherProps }: CardProps) => {
		return (
			<div className={classNames(styles.card, {}, [className])} {...otherProps}>
				{children}
			</div>
		);
	}
);

Card.displayName = 'Card';
