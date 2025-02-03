import styles from './ProfilePage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList
} from '../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from '../model/slice/profileSlice';

const reducers: ReducersList = {
	profile: profileReducer
};

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames(styles.ProfilePage, {}, [className])}>
				Profile Page
			</div>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
