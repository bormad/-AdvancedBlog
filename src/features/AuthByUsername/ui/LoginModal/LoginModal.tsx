import styles from './LoginModal.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
	return (
		<Modal
			className={classNames(styles.loginModal, {}, [className])}
			isOpen={isOpen}
			onClose={onClose}
			lazy
		>
			<LoginForm />
		</Modal>
	);
};
