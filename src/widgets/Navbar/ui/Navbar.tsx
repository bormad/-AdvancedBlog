import styles from './Navbar.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { useTheme } from '../../../app/providers';
import { AppLink } from '../../../shared/ui';
import { AppLinkTheme } from '../../../shared/ui/AppLink/AppLink';
import { ThemeSwicher } from '../../ThemeSwitcher';

interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	return (
		<div className={classNames(styles.navbar, {}, [className])}>
			<div className={styles.links}>
				<AppLink theme={AppLinkTheme.SECONDARY} to={'/'}>
					Главная
				</AppLink>
				<AppLink to={'/about'}>О сайте</AppLink>
			</div>
		</div>
	);
};
