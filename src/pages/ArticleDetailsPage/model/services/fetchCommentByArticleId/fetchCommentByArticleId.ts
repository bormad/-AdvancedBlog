import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { Comment } from '../../../../../entities/Comment';

export interface ThunkExtra {
	api: AxiosInstance;
	navigate?: (to: To, options?: NavigateOptions) => void | Promise<void>;
}

export const fetchCommentByArticleId = createAsyncThunk<
	Comment[],
	string | undefined,
	{ rejectValue: string; extra: ThunkExtra }
>('articleDetails/fetchCommentByArticleId', async (articleId, thunkAPI) => {
	if (!articleId) {
		return thunkAPI.rejectWithValue('error');
	}

	try {
		const response = await thunkAPI.extra.api.get<Comment[]>('/comments', {
			params: {
				articleId
			}
		});

		if (!response.data) {
			throw new Error();
		}

		// Fetch user data for each comment
		const commentsWithUsers = await Promise.all(
			response.data.map(async (comment) => {
				const userResponse = await thunkAPI.extra.api.get(
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					`/users/${comment.userId}`
				);
				return { ...comment, user: userResponse.data };
			})
		);

		console.log(commentsWithUsers, 'commentsWithUsers');

		return commentsWithUsers;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue('error');
	}
});
