import styles from './Navbar.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Button } from '../../../shared/ui';
import { ThemeButton } from '../../../shared/ui/Button/Button';
import { useCallback, useState } from 'react';
import { LoginModal } from '../../../features/AuthByUsername';

interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	const [isAuthModal, setIsAuthModal] = useState(false);

	const onToggleModal = useCallback(() => {
		setIsAuthModal((prev) => !prev);
	}, []);
	return (
		<div className={classNames(styles.navbar, {}, [className])}>
			<Button
				onClick={onToggleModal}
				theme={ThemeButton.CLEAR}
				className={styles.links}
			>
				Войти
			</Button>
			<LoginModal isOpen={isAuthModal} onClose={onToggleModal} />
		</div>
	);
};
