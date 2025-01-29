import styles from './LoginForm.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Button, Text } from '../../../../shared/ui';
import { Input } from '../../../../shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions } from '../../model/slice/loginSlice';
import { getLoginState } from '../../model/selecrots/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { TextTheme } from '../../../../shared/ui/Text/Text';

interface LoginFormProps {
	className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { username, password, error, isLoading } = useSelector(getLoginState);

	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(loginActions.setUsername(value));
		},
		[dispatch]
	);

	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassord(value));
		},
		[dispatch]
	);

	const onLoginClick = useCallback(
		(event: React.FormEvent) => {
			event.preventDefault();
			dispatch(loginByUsername({ username, password }));
		},
		[dispatch, username, password]
	);

	return (
		<form className={classNames(styles.loginForm, {}, [className])}>
			{error && <Text text={error} theme={TextTheme.ERROR} />}
			<Input
				type='text'
				className={styles.input}
				placeholder='Введите логин'
				onChange={onChangeUsername}
				value={username}
				autofocus
			/>
			<Input
				type='text'
				className={styles.input}
				placeholder='Введите пароль'
				onChange={onChangePassword}
				value={password}
			/>
			<Button
				className={styles.loginBtn}
				disabled={isLoading}
				onClick={onLoginClick}
			>
				Войти
			</Button>
		</form>
	);
});

LoginForm.displayName = 'LoginForm';
