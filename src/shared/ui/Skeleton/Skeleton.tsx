import styles from './Skeleton.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { CSSProperties, memo } from 'react';

interface SkeletonProps {
	className?: string;
	height?: string | number;
	width?: string | number;
	border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
	const { className, height, width, border } = props;

	const stl: CSSProperties = {
		width,
		height,
		borderRadius: border
	};

	return (
		<div
			className={classNames(styles.skeleton, {}, [className])}
			style={stl}
		></div>
	);
});

Skeleton.displayName = 'Skeleton';
