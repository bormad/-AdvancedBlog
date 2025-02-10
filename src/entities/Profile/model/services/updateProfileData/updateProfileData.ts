import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { Profile } from '../../types/profile';
import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export interface ThunkExtra {
	api: AxiosInstance;
	navigate?: (to: To, options?: NavigateOptions) => void | Promise<void>;
}

export const updateProfileData = createAsyncThunk<
	Profile,
	void,
	{ rejectValue: string; extra: ThunkExtra }
>('profile/updateProfileData', async (_, thunkAPI) => {
	const formData = getProfileForm(thunkAPI.getState() as StateSchema);
	console.log(formData, 'formdata');
	try {
		const response = await thunkAPI.extra.api.put<Profile>(
			'/profile',
			formData
		);

		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue('error');
	}
});
