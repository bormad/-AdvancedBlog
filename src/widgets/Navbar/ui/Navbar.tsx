import styles from './Navbar.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Button } from '../../../shared/ui';
import { ThemeButton } from '../../../shared/ui/Button/Button';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from '../../../features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from '../../../entities/User';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const [isAuthModal, setIsAuthModal] = useState(false);
	const authData = useSelector(getUserAuthData);
	const dispatch = useDispatch();

	const onToggleModal = useCallback(() => {
		setIsAuthModal((prev) => !prev);
	}, []);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

	if (authData) {
		return (
			<div className={classNames(styles.navbar, {}, [className])}>
				<Button
					onClick={onLogout}
					theme={ThemeButton.CLEAR}
					className={styles.links}
				>
					Выйти
				</Button>
			</div>
		);
	}

	return (
		<div className={classNames(styles.navbar, {}, [className])}>
			<Button
				onClick={onToggleModal}
				theme={ThemeButton.CLEAR}
				className={styles.links}
			>
				Войти
			</Button>
			{isAuthModal && (
				<LoginModal isOpen={isAuthModal} onClose={onToggleModal} />
			)}
		</div>
	);
});

Navbar.displayName = 'Navbar';
