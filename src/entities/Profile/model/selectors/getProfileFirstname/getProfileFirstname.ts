import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getProfileFirstname = (state: StateSchema) =>
	state.profile?.data?.first || '';
