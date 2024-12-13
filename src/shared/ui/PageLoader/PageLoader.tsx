import styles from './PageLoader.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Loader } from '../Loader/Loader';

interface PageLoaderProps {
	className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {
	return (
		<div className={classNames(styles.pageLoader, {}, [className])}>
			<Loader />
		</div>
	);
};
