import styles from './Button.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

export enum ThemeButton {
	CLEAR = 'clear'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
	theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
	const { className, children, theme, ...otherProps } = props;

	return (
		<button
			className={classNames(styles.button, {}, [className, styles[theme]])}
			{...otherProps}
		>
			{children}
		</button>
	);
};
