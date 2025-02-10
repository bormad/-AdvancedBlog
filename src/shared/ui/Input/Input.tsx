import styles from './Input.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';

interface InputProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'onChange' | 'value' | 'readOnly'
	> {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	autofocus?: boolean;
	readonly?: boolean;
}

const InputComponent = (props: InputProps) => {
	const {
		className,
		value,
		onChange,
		type = 'text',
		placeholder,
		autofocus,
		readonly,
		...otherProps
	} = props;

	const [isFocused, setIsFocused] = useState(false);
	const [caretPosition, setCaretPosition] = useState(0);
	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (autofocus) {
			setIsFocused(true);
			ref.current?.focus();
		}
	}, [autofocus]);

	const onChangeHangler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
		setCaretPosition(e.target.value.length);
	};

	const onBlur = () => {
		setIsFocused(false);
	};

	const onFocus = () => {
		setIsFocused(true);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSelect = (e: any) => {
		setCaretPosition(e?.target?.selectionStart || 0);
	};

	return (
		<div
			className={classNames(
				styles.inputWrapper,
				{ [styles.readonly]: !!readonly },
				[className]
			)}
		>
			{placeholder && (
				<div className={styles.placeholder}>{placeholder + '>'}</div>
			)}
			<div className={styles.caretWrapper}>
				<input
					className={styles.input}
					ref={ref}
					type={type}
					value={value}
					onChange={onChangeHangler}
					onFocus={onFocus}
					onBlur={onBlur}
					onSelect={onSelect}
					readOnly={readonly}
					{...otherProps}
				/>
				{isFocused && !readonly && (
					<span
						className={styles.caret}
						style={{ left: `${caretPosition * 9}px` }}
					/>
				)}
			</div>
		</div>
	);
};

export const Input = memo(InputComponent);
