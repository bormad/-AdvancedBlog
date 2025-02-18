import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { Article } from '../../types/article';

export interface ThunkExtra {
	api: AxiosInstance;
	navigate?: (to: To, options?: NavigateOptions) => void | Promise<void>;
}

export const fetchArticleById = createAsyncThunk<
	Article,
	string,
	{ rejectValue: string; extra: ThunkExtra }
>('articleDetails/fetchArticleById', async (articleId, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.get<Article>(
			`/articles/${articleId}`
		);

		if (!response.data) {
			throw new Error();
		}

		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue('error');
	}
});
