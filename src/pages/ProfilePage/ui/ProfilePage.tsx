import styles from './ProfilePage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList
} from '../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
	profileActions,
	profileReducer
} from '../../../entities/Profile/model/slice/profileSlice';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { fetchProfileData } from '../../../entities/Profile/model/services/fetchProfileData/fetchProfileData';
import { ProfileCard } from '../../../entities/Profile';
import { getProfileError } from '../../../entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../../entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../../entities/Profile/model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileForm } from '../../../entities/Profile/model/selectors/getProfileForm/getProfileForm';
import { Currency } from '../../../entities/Currency/model/types/currency';
import { Country } from '../../../entities/Country/model/types/country';
import { getProfileValidateError } from '../../../entities/Profile/model/selectors/getProfileValidateError/getProfileValidateError';
import { Text } from '../../../shared/ui';
import { TextTheme } from '../../../shared/ui/Text/Text';
import { useParams } from 'react-router-dom';

const reducers: ReducersList = {
	profile: profileReducer
};

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const form = useSelector(getProfileForm);
	const error = useSelector(getProfileError);
	const isLoading = useSelector(getProfileIsLoading);
	const readonly = useSelector(getProfileReadonly);
	const validateError = useSelector(getProfileValidateError);

	useEffect(() => {
		if (id) {
			dispatch(fetchProfileData(id));
		}
	}, [dispatch, id]);

	const onChangeFirstname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ first: value || '' }));
		},
		[dispatch]
	);

	const onChangeLastname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ lastname: value || '' }));
		},
		[dispatch]
	);

	const onChangeCity = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ city: value || '' }));
		},
		[dispatch]
	);

	const onChangeAge = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
		},
		[dispatch]
	);
	const onChangeUsername = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ username: value || '' }));
		},
		[dispatch]
	);
	const onChangeAvatar = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ avatar: value || '' }));
		},
		[dispatch]
	);
	const onChangeCurrency = useCallback(
		(currency?: Currency) => {
			dispatch(profileActions.updateProfile({ currency }));
		},
		[dispatch]
	);

	const onChangeCountry = useCallback(
		(country?: Country) => {
			dispatch(profileActions.updateProfile({ country }));
		},
		[dispatch]
	);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames(styles.ProfilePage, {}, [className])}>
				<ProfileCard
					isLoading={isLoading}
					error={error}
					data={form}
					readonly={readonly}
					onChangeFirstname={onChangeFirstname}
					onChangeLastname={onChangeLastname}
					onChangeCity={onChangeCity}
					onChangeAge={onChangeAge}
					onChangeUsername={onChangeUsername}
					onChangeAvatar={onChangeAvatar}
					onChangeCurrency={onChangeCurrency}
					onChangeCountry={onChangeCountry}
				/>
				{validateError?.length &&
					validateError.map((err) => (
						<Text theme={TextTheme.ERROR} title={err} key={err} />
					))}
			</div>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
