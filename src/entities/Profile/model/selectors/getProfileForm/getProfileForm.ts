import { StateSchema } from '../../../../../app/providers/StoreProvider/config/StateSchema';
import { ProfileData } from '../getProfileData/getProfileData';

export const getProfileForm = (state: StateSchema): ProfileData =>
	state.profile?.form as ProfileData;
