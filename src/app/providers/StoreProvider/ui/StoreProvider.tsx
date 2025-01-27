import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { cheateReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: StateSchema;
}

export const StoreProvider = ({
	children,
	initialState
}: StoreProviderProps) => {
	const store = cheateReduxStore(initialState);
	return <Provider store={store}>{children}</Provider>;
};
