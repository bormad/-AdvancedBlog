import styles from './ProfilePageHeader.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Button, Text } from '../../../../shared/ui';
import { ThemeButton } from '../../../../shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileReadonly } from '../../../../entities/Profile/model/selectors/getProfileReadonly/getProfileReadonly';
import { useCallback } from 'react';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import {
	profileActions,
	updateProfileData
} from '../../../../entities/Profile';
interface ProfilePageHeaderProps {
	className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
	const readonly = useSelector(getProfileReadonly);
	const dispatch = useDispatch<AppDispatch>();

	const onEdit = useCallback(() => {
		dispatch(profileActions.setReadonly(false));
	}, [dispatch]);

	const onCancelEdit = useCallback(() => {
		dispatch(profileActions.cancelEdit());
	}, [dispatch]);

	const onSave = useCallback(() => {
		dispatch(updateProfileData());
	}, [dispatch]);

	return (
		<div className={classNames(styles.profilePageHeader, {}, [className])}>
			<Text title='Профиль' />
			{readonly ? (
				<Button
					theme={ThemeButton.OUTLINE}
					className={styles.editBtn}
					onClick={onEdit}
				>
					Редактировать
				</Button>
			) : (
				<>
					<Button
						theme={ThemeButton.OUTLINE_RED}
						className={styles.editBtn}
						onClick={onCancelEdit}
					>
						Отменить
					</Button>

					<Button
						theme={ThemeButton.OUTLINE}
						className={styles.saveBtn}
						onClick={onSave}
					>
						Сохранить
					</Button>
				</>
			)}
		</div>
	);
};
