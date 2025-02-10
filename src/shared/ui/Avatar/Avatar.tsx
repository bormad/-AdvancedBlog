import styles from './Avatar.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';

interface AvatarProps {
	className?: string;
	src?: string;
	alt?: string;
	size?: number;
}

export const Avatar = ({ className, src, size, alt }: AvatarProps) => {
	const style = useMemo<CSSProperties>(() => {
		return {
			width: size,
			height: size
		};
	}, [size]);

	return (
		<img
			src={src}
			alt={alt}
			className={classNames(styles.avatar, {}, [className])}
			style={style}
		/>
	);
};
