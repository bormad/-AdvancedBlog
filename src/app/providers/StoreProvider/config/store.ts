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

export function createReduxStore(initialState?: StateSchema) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		counter: counterReducer,
		user: userReducer
	};

	const reducerManager = createReducerManager(rootReducers);

	const store = configureStore<StateSchema>({
		reducer: reducerManager.reduce,
		preloadedState: initialState
	}) as ReduxStoreWithManager;

	store.reducerManager = reducerManager;

	return store;
}

export type RootState = ReturnType<
	ReturnType<typeof createReduxStore>['getState']
>;

export type AppDispatch = ThunkDispatch<RootState, undefined, UnknownAction>;
