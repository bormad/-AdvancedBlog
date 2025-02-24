import {
	createEntityAdapter,
	createSlice,
	PayloadAction
} from '@reduxjs/toolkit';
import { Comment } from '../../../../entities/Comment';
import { StateSchema } from '../../../../app/providers/StoreProvider/config/StateSchema';
import { fetchCommentByArticleId } from '../services/fetchCommentByArticleId/fetchCommentByArticleId';
import { ArticleDetailsCommentSchema } from '../type/ArticleDetailsCommentSchema';

const commentsAdapter = createEntityAdapter({
	selectId: (comment: Comment) => comment.id
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
	(state) => state.articleDetailsComments || commentsAdapter.getInitialState()
);

const articleDetailsCommentsSlice = createSlice({
	name: 'articleDetailsCommentsSlice',
	initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {}
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCommentByArticleId.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(
			fetchCommentByArticleId.fulfilled,
			(state, action: PayloadAction<Comment[]>) => {
				state.isLoading = false;
				commentsAdapter.setAll(state, action.payload);
			}
		);
		builder.addCase(fetchCommentByArticleId.rejected, (state, actions) => {
			state.isLoading = false;
			state.error = actions.payload;
		});
	}
});

export const { reducer: articleDetailsCommentsReducer } =
	articleDetailsCommentsSlice;
