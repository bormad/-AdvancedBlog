import styles from './ArticleDetailsPage.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleDetails } from '../../../../entities/Article';
import { useParams } from 'react-router-dom';

interface ArticleDetailsPageProps {
	className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return (
			<div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
				Статья не найдена
			</div>
		);
	}

	return (
		<div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
			<ArticleDetails id={id} />
		</div>
	);
};

export default memo(ArticleDetailsPage);
