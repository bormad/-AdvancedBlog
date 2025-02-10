import styles from './Select.module.scss';
import { classNames, Mods } from '../../../shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';

export interface SelectOption {
	value: string;
	content: string;
}

interface SelectProps {
	className?: string;
	label?: string;
	readonly?: boolean;
	options?: SelectOption[];
	value?: string;
	onChange?: (value: string) => void;
}

export const Select = memo((props: SelectProps) => {
	const { className, label, readonly, options, value, onChange } = props;

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value);
	};

	const optionList = useMemo(() => {
		return options?.map(({ value, content }) => (
			<option className={styles.option} value={value} key={value}>
				{content}
			</option>
		));
	}, [options]);

	const mods: Mods = { [styles.readonly]: !!readonly };

	return (
		<div className={classNames(styles.wrapper, mods, [className])}>
			{label && <span className={styles.label}>{`${label}>`}</span>}
			<select
				className={styles.select}
				disabled={readonly}
				value={value}
				onChange={onChangeHandler}
			>
				{optionList}
			</select>
		</div>
	);
});

Select.displayName = 'Select';
