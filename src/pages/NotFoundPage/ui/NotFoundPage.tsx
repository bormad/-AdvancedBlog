import styles from './NotFoundPage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';

interface NotFoundPageProps {
	className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
	return (
		<div className={classNames(styles.notFoundPage, {}, [className])}>
			Страница не найдена
		</div>
	);
};
