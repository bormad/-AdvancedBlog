import styles from './Sidebar.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { useState } from 'react';
import { ThemeSwicher } from '../../../ThemeSwitcher';

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
			className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [
				className
			])}
		>
			<button onClick={onToggle}>toggle</button>
			<div className={styles.switchers}>
				<ThemeSwicher />
			</div>
		</div>
	);
};
