import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from '../../../../entities/Counter/model/slice/counterSlice';
import { userReducer } from '../../../../entities/User';

export function cheateReduxStore(initialState?: StateSchema) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		counter: counterReducer,
		user: userReducer
	};

	return configureStore<StateSchema>({
		reducer: rootReducers,
		preloadedState: initialState
	});
}
