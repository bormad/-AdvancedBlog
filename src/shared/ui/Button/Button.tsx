import styles from './Button.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

export enum ThemeButton {
	CLEAR = 'clear',
	OUTLINE = 'outline',
	BACKGRORUND = 'background',
	BACKGRORUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
	M = 'sizeM',
	L = 'sizeL',
	XL = 'sizeXl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ThemeButton;
	square?: boolean;
	size?: ButtonSize;
	children: ReactNode;
}

export const Button: FC<ButtonProps> = (props) => {
	const {
		className,
		children,
		theme,
		square,
		size = ButtonSize.M,
		...otherProps
	} = props;

	const mods: Record<string, boolean> = {
		[styles.square]: square
	};

	return (
		<button
			className={classNames(styles.button, mods, [
				className,
				styles[theme],
				styles[size]
			])}
			{...otherProps}
		>
			{children}
		</button>
	);
};
