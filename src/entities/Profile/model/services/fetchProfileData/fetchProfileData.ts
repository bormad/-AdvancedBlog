import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { Profile } from '../../types/profile';

export interface ThunkExtra {
	api: AxiosInstance;
	navigate?: (to: To, options?: NavigateOptions) => void | Promise<void>;
}

export const fetchProfileData = createAsyncThunk<
	Profile,
	string,
	{ rejectValue: string; extra: ThunkExtra }
>('profile/fetchProfileData', async (profileId, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.get<Profile>(
			`/profile/${profileId}`
		);

		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue('error');
	}
});
