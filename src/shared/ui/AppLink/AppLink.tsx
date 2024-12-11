import styles from './AppLink.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import { FC, ReactNode } from 'react';

export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
	className?: string;
	children: ReactNode;
	theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = ({
	className,
	to,
	children,
	theme = AppLinkTheme.PRIMARY,
	...otherProps
}) => {
	return (
		<Link
			to={to}
			className={classNames(styles.appLink, {}, [className, styles[theme]])}
			{...otherProps}
		>
			{children}
		</Link>
	);
};
