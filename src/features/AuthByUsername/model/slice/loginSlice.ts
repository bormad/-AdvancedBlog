import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

const initialState: LoginSchema = {
	isLoading: false,
	username: '',
	password: ''
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setUsername: (state: LoginSchema, actions: PayloadAction<string>) => {
			state.username = actions.payload;
		},
		setPassord: (state: LoginSchema, actions: PayloadAction<string>) => {
			state.password = actions.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(loginByUsername.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(loginByUsername.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(loginByUsername.rejected, (state, actions) => {
			state.isLoading = false;
			state.error = actions.payload;
		});
	}
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
