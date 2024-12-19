import styles from './Sidebar.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { useState } from 'react';
import { ThemeSwicher } from '../../../ThemeSwitcher';
import {
	Button,
	ButtonSize,
	ThemeButton
} from '../../../../shared/ui/Button/Button';
import { AppLink } from '../../../../shared/ui';
import { AppLinkTheme } from '../../../../shared/ui/AppLink/AppLink';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import AboutIcon from '../../../../shared/assets/icons/about-20-20.svg';
import MainIcon from '../../../../shared/assets/icons/main-20-20.svg';

interface SidebarProps {
	className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<div
			data-testid='sidebar'
			className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [
				className
			])}
		>
			<Button
				theme={ThemeButton.BACKGRORUND_INVERTED}
				className={styles.btn}
				data-testid='sidebar-toggle'
				square
				size={ButtonSize.L}
				onClick={onToggle}
			>
				{collapsed ? '>' : '<'}
			</Button>
			<div className={styles.items}>
				<AppLink
					className={styles.item}
					theme={AppLinkTheme.SECONDARY}
					to={RoutePath.main}
				>
					<MainIcon className={styles.icon} />
					<span className={styles.link}>Главная</span>
				</AppLink>
				<AppLink
					className={styles.item}
					theme={AppLinkTheme.SECONDARY}
					to={RoutePath.about}
				>
					<AboutIcon className={styles.icon} />
					<span className={styles.link}>О сайте</span>
				</AppLink>
			</div>
			<div className={styles.switchers}>
				<ThemeSwicher />
			</div>
		</div>
	);
};
