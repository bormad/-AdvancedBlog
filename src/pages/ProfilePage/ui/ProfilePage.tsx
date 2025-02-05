import styles from './ProfilePage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList
} from '../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from '../../../entities/Profile/model/slice/profileSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { fetchProfileData } from '../../../entities/Profile/model/services/fetchProfileData/fetchProfileData';
import { ProfileCard } from '../../../entities/Profile';

const reducers: ReducersList = {
	profile: profileReducer
};

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchProfileData());
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames(styles.ProfilePage, {}, [className])}>
				<ProfileCard />
			</div>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
