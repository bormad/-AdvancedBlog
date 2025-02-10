import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

export interface ProfileData {
	first: string;
	lastname: string;
}

export const getProfileData = (state: StateSchema): ProfileData =>
	state.profile?.data as ProfileData;
