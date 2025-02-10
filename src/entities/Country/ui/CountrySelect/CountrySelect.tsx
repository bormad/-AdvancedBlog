import { memo, useCallback } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Select } from '../../../../shared/ui/Select/Select';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
	className?: string;
	readonly?: boolean;
	value?: Country;
	onChange?: (value: Country) => void;
}

const options = [
	{ value: Country.Russia, content: Country.Russia },
	{ value: Country.Belarus, content: Country.Belarus },
	{ value: Country.Kazakhstan, content: Country.Kazakhstan }
];

export const CountrySelect = memo(
	({ className, readonly, value, onChange }: CountrySelectProps) => {
		const onChangeHandler = useCallback(
			(value: string) => {
				onChange?.(value as Country);
			},
			[onChange]
		);

		return (
			<Select
				className={classNames('', {}, [className])}
				label='Укажите страну'
				readonly={readonly}
				options={options}
				value={value}
				onChange={onChangeHandler}
			/>
		);
	}
);

CountrySelect.displayName = 'CountrySelect';
