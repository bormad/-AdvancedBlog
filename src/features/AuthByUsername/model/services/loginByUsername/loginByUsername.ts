import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from '../../../../../entities/User';
import { USER_LOCALSTORAGE_KEY } from '../../../../../shared/const/localstorage';

interface loginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<
	User,
	loginByUsernameProps,
	{ rejectValue: string }
>('login/loginByUsername', async ({ username, password }, thunkAPI) => {
	try {
		const response = await axios.get('http://localhost:8000/users', {
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

		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue('error');
	}
});
