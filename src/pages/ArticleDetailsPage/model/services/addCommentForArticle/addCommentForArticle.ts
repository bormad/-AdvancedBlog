import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';
import { getUserAuthData } from '../../../../../entities/User';
import { getArticleDetailsData } from '../../../../../entities/Article/model/selectors/articleDetails';
import { fetchCommentByArticleId } from '../fetchCommentByArticleId/fetchCommentByArticleId';

export interface ThunkExtra {
	api: AxiosInstance;
	navigate?: (to: To, options?: NavigateOptions) => void | Promise<void>;
}

export const addCommentForArticle = createAsyncThunk<
	Comment,
	string,
	{ state: StateSchema; rejectValue: string; extra: ThunkExtra }
>('articleDetails/addCommentForArticle', async (text, thunkAPI) => {
	const userDataArray = getUserAuthData(thunkAPI.getState());
	if (!Array.isArray(userDataArray) || userDataArray.length === 0) {
		return thunkAPI.rejectWithValue('no data');
	}
	const userData = userDataArray[0];
	const article = getArticleDetailsData(thunkAPI.getState());

	if (!userData || !text || !article) {
		return thunkAPI.rejectWithValue('no data');
	}

	try {
		const response = await thunkAPI.extra.api.post<Comment>('/comments', {
			articleId: article?.id,
			userId: userData?.id,
			text
		});

		if (!response.data) {
			throw new Error();
		}

		thunkAPI.dispatch(fetchCommentByArticleId(article.id));

		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue('error');
	}
});
