import styles from './ArticleDetails.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList
} from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import EyeIcon from '../../../../shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '../../../../shared/assets/icons/calendar-20-20.svg';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading
} from '../../model/selectors/articleDetails';
import { Text } from '../../../../shared/ui';
import {
	TextAlign,
	TextSize,
	TextTheme
} from '../../../../shared/ui/Text/Text';
import { Skeleton } from '../../../../shared/ui/Skeleton/Skeleton';
import { Avatar } from '../../../../shared/ui/Avatar/Avatar';
import { Icon } from '../../../../shared/ui/Icon/Icon';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
	className?: string;
	id: string;
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const article = useSelector(getArticleDetailsData);
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const error = useSelector(getArticleDetailsError);

	const renderBlock = useCallback((block: ArticleBlock) => {
		switch (block.type) {
			case ArticleBlockType.CODE:
				return (
					<ArticleCodeBlockComponent
						key={block.id}
						className={styles.block}
						block={block}
					/>
				);
			case ArticleBlockType.IMAGE:
				return (
					<ArticleImageBlockComponent
						key={block.id}
						className={styles.block}
						block={block}
					/>
				);
			case ArticleBlockType.TEXT:
				return (
					<ArticleTextBlockComponent
						key={block.id}
						className={styles.block}
						block={block}
					/>
				);
			default:
				return null;
		}
	}, []);

	useEffect(() => {
		dispatch(fetchArticleById(id));
	}, [dispatch, id]);

	let content;

	if (isLoading) {
		content = (
			<>
				<Skeleton
					className={styles.avatar}
					width={200}
					height={200}
					border={'50%'}
				/>
				<Skeleton className={styles.title} width={300} height={32} />
				<Skeleton className={styles.skeleton} width={600} height={24} />
				<Skeleton className={styles.skeleton} width={'100%'} height={200} />
			</>
		);
	} else if (error) {
		content = (
			<Text
				align={TextAlign.CENTER}
				title='Произошла ошибка при загрузке'
				theme={TextTheme.ERROR}
			/>
		);
	} else {
		content = (
			<>
				<div className={styles.avatarWrapper}>
					<Avatar size={200} src={article?.img} className={styles.avatar} />
				</div>
				<Text
					className={styles.title}
					title={article?.title}
					text={article?.subtitle}
					size={TextSize.L}
				/>
				<div className={styles.articleInfo}>
					<Icon className={styles.icon} Svg={EyeIcon} />
					<Text text={String(article?.views)} />
				</div>
				<div className={styles.articleInfo}>
					<Icon className={styles.icon} Svg={CalendarIcon} />
					<Text text={article?.createdAt} />
				</div>
				{article?.blocks.map(renderBlock)}
			</>
		);
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames(styles.articleDetails, {}, [className])}>
				{content}
			</div>
		</DynamicModuleLoader>
	);
});

ArticleDetails.displayName = 'ArticleDetails';
