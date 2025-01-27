import styles from './LoginForm.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Button } from '../../../../shared/ui';
import { Input } from '../../../../shared/ui/Input/Input';

interface LoginFormProps {
	className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
	return (
		<form className={classNames(styles.loginForm, {}, [className])}>
			<Input
				type='text'
				className={styles.input}
				placeholder='Введите логин'
				autofocus
			/>
			<Input
				type='text'
				className={styles.input}
				placeholder='Введите пароль'
			/>
			<Button className={styles.loginBtn}>Войти</Button>
		</form>
	);
};
