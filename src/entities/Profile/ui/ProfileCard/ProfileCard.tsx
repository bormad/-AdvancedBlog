import { classNames } from '../../../../shared/lib/classNames/classNames';
import styles from './ProfileCard.module.scss';
import { Text } from '../../../../shared/ui';
import { Input } from '../../../../shared/ui/Input/Input';
import { Profile } from '../../model/types/profile';
import { Loader } from '../../../../shared/ui/Loader/Loader';
import { TextAlign, TextTheme } from '../../../../shared/ui/Text/Text';
import { ProfilePageHeader } from '../../../../pages/ProfilePage/ui/ProfilePageHeader/ProfilePageHeader';
import { Avatar } from '../../../../shared/ui/Avatar/Avatar';
import { Country } from '../../../Country/model/types/country';
import { CurrencySelect } from '../../../Currency/ui/CurrencySelect/CurrencySelect';
import { Currency } from '../../../Currency/model/types/currency';
import { CountrySelect } from '../../../Country/ui/CountrySelect/CountrySelect';
interface ProfileCardProps {
	className?: string;
	data?: Profile;
	error?: string;
	isLoading?: boolean;
	readonly?: boolean;
	onChangeFirstname: (value?: string) => void;
	onChangeLastname: (value?: string) => void;
	onChangeAge: (value?: string) => void;
	onChangeCity: (value?: string) => void;
	onChangeUsername: (value?: string) => void;
	onChangeAvatar: (value?: string) => void;
	onChangeCurrency: (currency?: Currency) => void;
	onChangeCountry: (country?: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
	const {
		className,
		data,
		error,
		isLoading,
		readonly,
		onChangeFirstname,
		onChangeLastname,
		onChangeAge,
		onChangeCity,
		onChangeUsername,
		onChangeAvatar,
		onChangeCurrency,
		onChangeCountry
	} = props;

	if (isLoading) {
		return (
			<div
				className={classNames(styles.profileCard, {}, [
					className,
					styles.loader
				])}
			>
				<Loader />
			</div>
		);
	}

	if (error) {
		return (
			<div
				className={classNames(styles.profileCard, {}, [
					className,
					styles.error
				])}
			>
				<Text
					title='Произошла ошибка при загрузке профиля'
					text='Попробуйте обновить страницу'
					theme={TextTheme.ERROR}
					align={TextAlign.CENTER}
				/>
			</div>
		);
	}

	return (
		<div className={classNames(styles.profileCard, {}, [className])}>
			<ProfilePageHeader />

			<Avatar src={data?.avatar} alt='Аватарка пользователя' />

			<div className={styles.data}>
				<Input
					className={styles.input}
					value={data?.first}
					placeholder='Ваше имя'
					onChange={onChangeFirstname}
					readonly={readonly}
				/>
				<Input
					className={styles.input}
					value={data?.lastname}
					placeholder='Ваша фамилия'
					onChange={onChangeLastname}
					readonly={readonly}
				/>
				<Input
					className={styles.input}
					value={data?.age}
					placeholder='Ваш возраст'
					onChange={onChangeAge}
					readonly={readonly}
				/>
				<Input
					className={styles.input}
					value={data?.city}
					placeholder='Ваш город'
					onChange={onChangeCity}
					readonly={readonly}
				/>
				<Input
					className={styles.input}
					value={data?.username}
					placeholder='Ваш псевдоним'
					onChange={onChangeUsername}
					readonly={readonly}
				/>
				<Input
					className={styles.input}
					value={data?.avatar}
					placeholder='Ваш аватар'
					onChange={onChangeAvatar}
					readonly={readonly}
				/>

				<CurrencySelect
					className={styles.select}
					readonly={readonly}
					value={data?.currency}
					onChange={onChangeCurrency}
				/>

				<CountrySelect
					className={styles.select}
					readonly={readonly}
					value={data?.country}
					onChange={onChangeCountry}
				/>
			</div>
		</div>
	);
};
