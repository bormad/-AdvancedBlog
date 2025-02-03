import styles from './Sidebar.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo, useMemo, useState } from 'react';
import { ThemeSwicher } from '../../../ThemeSwitcher';
import {
	Button,
	ButtonSize,
	ThemeButton
} from '../../../../shared/ui/Button/Button';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { SidebarItemsList } from '../../module/items';

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	const itemList = useMemo(() => {
		return SidebarItemsList.map((item) => (
			<SidebarItem item={item} collapsed={collapsed} key={item.path} />
		));
	}, [collapsed]);

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
			{itemList}
			<div className={styles.switchers}>
				<ThemeSwicher />
			</div>
		</div>
	);
});

Sidebar.displayName = 'Sidebar';
