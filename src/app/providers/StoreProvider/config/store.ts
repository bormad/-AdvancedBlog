import {
	configureStore,
	ReducersMapObject,
	ThunkDispatch,
	UnknownAction
} from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchema } from './StateSchema';
import { counterReducer } from '../../../../entities/Counter/model/slice/counterSlice';
import { userReducer } from '../../../../entities/User';
import { createReducerManager } from './reducerManager';
import { $api } from '../../../../shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';
import { Reducer } from '@reduxjs/toolkit';
import { ThunkExtra } from '../../../../entities/Profile/model/services/fetchProfileData/fetchProfileData';

export function createReduxStore(
	navigate?: (to: To, options?: NavigateOptions) => void | Promise<void>,
	initialState?: StateSchema
) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		counter: counterReducer,
		user: userReducer
	};

	const reducerManager = createReducerManager(rootReducers);

	const extraArgument: ThunkExtra = {
		api: $api,
		navigate
	};

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<StateSchema>,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument
				}
			})
	}) as unknown as ReduxStoreWithManager;

	store.reducerManager = reducerManager;

	return store;
}

export type RootState = ReturnType<
	ReturnType<typeof createReduxStore>['getState']
>;

export type AppDispatch = ThunkDispatch<RootState, ThunkExtra, UnknownAction>;
