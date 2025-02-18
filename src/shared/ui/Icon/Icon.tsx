import styles from './Icon.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { memo } from 'react';

interface IconProps {
	className?: string;
	Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

export const Icon = memo(({ className, Svg }: IconProps) => {
	return <Svg className={classNames(styles.icon, {}, [className])} />;
});

Icon.displayName = 'Icon';
