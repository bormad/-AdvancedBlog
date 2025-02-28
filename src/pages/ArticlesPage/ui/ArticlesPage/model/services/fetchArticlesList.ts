import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { Article } from '../../../../../../entities/Article';

export interface ThunkExtra {
	api: AxiosInstance;
	navigate?: (to: To, options?: NavigateOptions) => void | Promise<void>;
}

export const fetchArticleList = createAsyncThunk<
	Article[],
	void,
	{ rejectValue: string; extra: ThunkExtra }
>('articleDetails/fetchArticleList', async (articleId, thunkAPI) => {
	try {
		const articlesResponse = await thunkAPI.extra.api.get<Article[]>(
			`/articles`
		);

		if (!articlesResponse.data) {
			throw new Error();
		}

		const articlesWithUsers = await Promise.all(
			articlesResponse.data.map(async (article) => {
				const userResponse = await thunkAPI.extra.api.get(
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					`/users/${article.userId}`
				);
				return {
					...article,
					user: userResponse.data
				};
			})
		);

		return articlesWithUsers;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue('error');
	}
});
