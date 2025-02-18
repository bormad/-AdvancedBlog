import styles from './Text.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { memo } from 'react';

export enum TextTheme {
	NORMAL = 'primary',
	ERROR = 'error'
}

export enum TextAlign {
	RIGHT = 'right',
	LEFT = 'left',
	CENTER = 'center'
}

export enum TextSize {
	M = 'sizeM',
	L = 'sizeL',
	XL = 'sizeXL'
}

interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	theme?: TextTheme;
	align?: TextAlign;
	size?: TextSize;
}

export const Text = memo(
	({
		className,
		title,
		text,
		theme = TextTheme.NORMAL,
		align = TextAlign.LEFT,
		size = TextSize.M
	}: TextProps) => {
		return (
			<div
				className={classNames(styles.Text, {}, [
					className,
					styles[theme],
					styles[align],
					styles[size]
				])}
			>
				{title && <p className={styles.title}>{title}</p>}
				{text && <p className={styles.text}>{text}</p>}
			</div>
		);
	}
);

Text.displayName = 'Text';
