import {
	EnhancedStore,
	Reducer,
	ReducersMapObject,
	UnknownAction
} from '@reduxjs/toolkit';
import { CounterShema } from '../../../../entities/Counter/model/types/counterShema';
import { UserSchema } from '../../../../entities/User';
import { LoginSchema } from '../../../../features/AuthByUsername';
import { ProfileSchema } from '../../../../pages/ProfilePage';
export interface StateSchema {
	counter: CounterShema;
	user: UserSchema;
	loginForm?: LoginSchema;
	profile?: ProfileSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: UnknownAction) => StateSchema;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager;
}
