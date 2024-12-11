import styles from './Navbar.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { useTheme } from '../../../app/providers';
import { AppLink } from '../../../shared/ui';
import { AppLinkTheme } from '../../../shared/ui/AppLink/AppLink';

interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	const { toggleTheme } = useTheme();

	return (
		<div className={classNames(styles.navbar, {}, [className])}>
			<button onClick={toggleTheme}>TOGGLE THEME</button>

			<div className={styles.links}>
				<AppLink theme={AppLinkTheme.SECONDARY} to={'/'}>
					Главная
				</AppLink>
				<AppLink to={'/about'}>О сайте</AppLink>
			</div>
		</div>
	);
};
