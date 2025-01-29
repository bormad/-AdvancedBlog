import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from '../../../../entities/Counter/model/slice/counterSlice';
import { userReducer } from '../../../../entities/User';
import { loginReducer } from '../../../../features/AuthByUsername';

export function cheateReduxStore(initialState?: StateSchema) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		counter: counterReducer,
		user: userReducer,
		loginForm: loginReducer
	};

	return configureStore<StateSchema>({
		reducer: rootReducers,
		preloadedState: initialState
	});
}

export type RootState = ReturnType<typeof cheateReduxStore>['getState'];
export type AppDispatch = ReturnType<typeof cheateReduxStore>['dispatch'];
