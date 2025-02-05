import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { User, userActions } from '../../../../../entities/User';
import { USER_LOCALSTORAGE_KEY } from '../../../../../shared/const/localstorage';
import { NavigateOptions, To } from 'react-router-dom';

interface loginByUsernameProps {
	username: string;
	password: string;
}

export interface ThunkExtra {
	api: AxiosInstance;
	navigate?: (to: To, options?: NavigateOptions) => void | Promise<void>;
}

export const loginByUsername = createAsyncThunk<
	User,
	loginByUsernameProps,
	{ rejectValue: string; extra: ThunkExtra }
>('login/loginByUsername', async ({ username, password }, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.get('/users', {
			params: {
				username,
				password
			}
		});

		if (!response.data || response.data.length === 0) {
			throw new Error();
		}

		localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
		thunkAPI.dispatch(userActions.setAuthData(response.data));
		if (thunkAPI.extra.navigate) {
			thunkAPI.extra.navigate('/profile');
		}
		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue('error');
	}
});
