import styles from './AddCommentForm.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button } from '../../../../shared/ui';
import { ThemeButton } from '../../../../shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAddCommentFormError,
	getAddCommentFormText
} from '../../model/selectors/addCommentFormSelectors';
import {
	addCommentFormActions,
	addCommentFormReducer
} from '../../model/slices/addCommentFormSlice';
import {
	DynamicModuleLoader,
	ReducersList
} from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';

interface addCommentFormProps {
	className?: string;
	onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
	addCommentForm: addCommentFormReducer
};

const AddCommentForm = memo(
	({ className, onSendComment }: addCommentFormProps) => {
		const text = useSelector(getAddCommentFormText);
		const error = useSelector(getAddCommentFormError);
		const dispatch = useDispatch<AppDispatch>();

		const onCommentTextChange = useCallback(
			(value: string) => {
				dispatch(addCommentFormActions.setText(value));
			},
			[dispatch]
		);
		const onSendHandler = useCallback(() => {
			onSendComment(text || '');
			onCommentTextChange('');
		}, [onSendComment, onCommentTextChange, text]);

		return (
			<DynamicModuleLoader reducers={reducers}>
				<div className={classNames(styles.addCommentForm, {}, [className])}>
					{error && 'ошибка'}
					<Input
						className={styles.input}
						placeholder='Введите текст комментария'
						value={text}
						onChange={onCommentTextChange}
					/>
					<Button theme={ThemeButton.OUTLINE} onClick={onSendHandler}>
						Отправить
					</Button>
				</div>
			</DynamicModuleLoader>
		);
	}
);

export default AddCommentForm;

AddCommentForm.displayName = 'AddCommentForm';
