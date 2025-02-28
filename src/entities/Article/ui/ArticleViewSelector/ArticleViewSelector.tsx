import styles from './ArticleViewSelector.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleView } from '../../model/types/article';
import ListIcon from '../../../../shared/assets/icons/list-24-24.svg';
import TiledIcon from '../../../../shared/assets/icons/tiled-24-24.svg';
import { Button } from '../../../../shared/ui';
import { Icon } from '../../../../shared/ui/Icon/Icon';
import { ThemeButton } from '../../../../shared/ui/Button/Button';

interface ArticleViewSelectorProps {
	className?: string;
	view: ArticleView;
	onViewClick?: (view: ArticleView) => void;
}

const viewType = [
	{
		view: ArticleView.SMALL,
		icon: TiledIcon
	},
	{
		view: ArticleView.BIG,
		icon: ListIcon
	}
];

export const ArticleViewSelector = memo(
	({ className, view, onViewClick }: ArticleViewSelectorProps) => {
		const onClick = (newView: ArticleView) => {
			onViewClick?.(newView);
		};

		return (
			<div className={classNames(styles.ArticleViewSelector, {}, [className])}>
				{viewType.map((viewType, index) => (
					<Button
						key={index}
						onClick={() => onClick(viewType.view)}
						theme={ThemeButton.CLEAR}
					>
						<Icon
							Svg={viewType.icon}
							className={classNames(
								'',
								{
									[styles.notselected]: viewType.view !== view
								},
								[]
							)}
						/>
					</Button>
				))}
			</div>
		);
	}
);

ArticleViewSelector.displayName = 'ArticleViewSelector';
