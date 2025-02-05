import styles from './Button.module.scss';
import { classNames, Mods } from '../../../shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

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
	disabled?: boolean;
}

export const Button = memo((props: ButtonProps) => {
	const {
		className,
		children,
		theme = ThemeButton.OUTLINE,
		square,
		size = ButtonSize.M,
		disabled = false,
		...otherProps
	} = props;

	const mods: Mods = {
		[styles.square]: !!square,
		[styles.disabled]: !!disabled
	};

	return (
		<button
			className={classNames(styles.button, mods, [
				className,
				styles[theme],
				styles[size]
			])}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	);
});

Button.displayName = 'Button';
