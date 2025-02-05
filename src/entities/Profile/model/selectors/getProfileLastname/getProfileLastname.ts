import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getProfileLastname = (state: StateSchema) =>
	state.profile?.data?.lastname || '';
