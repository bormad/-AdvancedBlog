import styles from './SidebarItem.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { AppLink } from '../../../../shared/ui';
import { AppLinkTheme } from '../../../../shared/ui/AppLink/AppLink';
import { SidebarItemType } from '../../module/items';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '../../../../entities/User';

interface SidebarItemProps {
	item?: SidebarItemType;
	collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
	const isAuth = useSelector(getUserAuthData);

	if (!item || !item.Icon) {
		return null;
	}

	if (item.authOnly && !isAuth) {
		return null;
	}

	return (
		<AppLink
			className={classNames(styles.item, { [styles.collapsed]: collapsed }, [
				styles.link
			])}
			theme={AppLinkTheme.SECONDARY}
			to={item.path}
		>
			<item.Icon className={styles.icon} />
			<span className={styles.link}>{item.text}</span>
		</AppLink>
	);
});

SidebarItem.displayName = 'SidebarItem';
