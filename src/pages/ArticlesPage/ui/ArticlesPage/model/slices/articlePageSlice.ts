import {
	createEntityAdapter,
	createSlice,
	PayloadAction
} from '@reduxjs/toolkit';
import { StateSchema } from '../../../../../../app/providers/StoreProvider/config/StateSchema';
import { Article } from '../../../../../../entities/Article';
import { articlePageSchema } from '../types/articlePageSchema';
import { ArticleView } from '../../../../../../entities/Article/model/types/article';
import { fetchArticleList } from '../services/fetchArticlesList';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '../../../../../../shared/const/localstorage';

const articlesAdapter = createEntityAdapter({
	selectId: (article: Article) => article.id
});

export const getArticles = articlesAdapter.getSelectors(
	(state: StateSchema) =>
		state.articlesPage || articlesAdapter.getInitialState()
);

const articlesPageSlice = createSlice({
	name: 'articlesPageSlice',
	initialState: articlesAdapter.getInitialState<articlePageSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
		view: ArticleView.SMALL
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload;
			localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
		},
		initState: (state) => {
			state.view = localStorage.getItem(
				ARTICLE_VIEW_LOCALSTORAGE_KEY
			) as ArticleView;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchArticleList.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(
			fetchArticleList.fulfilled,
			(state, action: PayloadAction<Article[]>) => {
				state.isLoading = false;
				articlesAdapter.setAll(state, action.payload);
			}
		);
		builder.addCase(fetchArticleList.rejected, (state, actions) => {
			state.isLoading = false;
			state.error = actions.payload;
		});
	}
});

export const { reducer: articlesPageReducer, actions: articlePageAction } =
	articlesPageSlice;
