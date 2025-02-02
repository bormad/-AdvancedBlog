import styles from './LoginForm.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Button, Text } from '../../../../shared/ui';
import { Input } from '../../../../shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { TextTheme } from '../../../../shared/ui/Text/Text';
import { getLoginUsername } from '../../model/selecrots/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selecrots/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selecrots/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selecrots/getLoginError/getLoginError';
import {
	DynamicModuleLoader,
	ReducersList
} from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

interface LoginFormProps {
	className?: string;
}
const initialReducers: ReducersList = {
	loginForm: loginReducer
};

const LoginForm = memo(({ className }: LoginFormProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);

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
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
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
		</DynamicModuleLoader>
	);
});

LoginForm.displayName = 'LoginForm';
export default LoginForm;
