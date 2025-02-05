import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';

interface ProfileData {
	first: string;
	lastname: string;
}

export const getProfileData = (state: StateSchema): ProfileData | undefined =>
	state.profile?.data;
