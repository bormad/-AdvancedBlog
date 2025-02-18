import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export const getProfileValidateError = (state: StateSchema) =>
	state.profile?.validateError;
