import styles from './PageError.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';

interface PageErrorProps {
	className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
	return (
		<div className={classNames(styles.pageError, {}, [className])}>
			Произошла ошибка, перезагрузите страницу
		</div>
	);
};
