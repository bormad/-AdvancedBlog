import { useSelector } from 'react-redux';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import styles from './ProfileCard.module.scss';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { Button, Text } from '../../../../shared/ui';
import { ThemeButton } from '../../../../shared/ui/Button/Button';
import { Input } from '../../../../shared/ui/Input/Input';
interface ProfileCardProps {
	className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
	const data = useSelector(getProfileData);
	// const error = useSelector(getProfileError);
	// const isLoading = useSelector(getProfileIsLoading);
	return (
		<div className={classNames(styles.profileCard, {}, [className])}>
			<div className={styles.header}>
				<Text title='Профиль' />
				<Button theme={ThemeButton.OUTLINE} className={styles.editBtn}>
					Редактировать
				</Button>
			</div>
			<div className={styles.data}>
				<Input
					className={styles.input}
					value={data?.first}
					placeholder='Ваше имя'
				/>
				<Input
					className={styles.input}
					value={data?.lastname}
					placeholder='Ваша фамилия'
				/>
			</div>
		</div>
	);
};
