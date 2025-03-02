import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
	text: ''
};

export const addCommentFormSlice = createSlice({
	name: 'addCommentForm',
	initialState,
	reducers: {
		setText: (state, action: PayloadAction<string>) => {
			state.text = action.payload;
		}
	}
	// extraReducers: (builder) => {
	// 	builder.addCase(loginByUsername.pending, (state) => {
	// 		state.error = undefined;
	// 		state.isLoading = true;
	// 	});
	// 	builder.addCase(loginByUsername.fulfilled, (state) => {
	// 		state.isLoading = false;
	// 	});
	// 	builder.addCase(loginByUsername.rejected, (state, actions) => {
	// 		state.isLoading = false;
	// 		state.error = actions.payload;
	// 	});
	// }
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
