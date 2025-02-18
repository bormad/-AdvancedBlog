import styles from './Code.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Button, ThemeButton } from '../Button/Button';
import CopyIcon from '../../../shared/assets/icons/copy-20-20.svg';

interface CodeProps {
	className?: string;
	text: string;
}

export const Code = memo(({ className, text }: CodeProps) => {
	const onCopy = useCallback(() => {
		navigator.clipboard.writeText(text);
	}, [text]);

	return (
		<pre className={classNames(styles.code, {}, [className])}>
			<Button
				onClick={onCopy}
				className={styles.copyBtn}
				theme={ThemeButton.CLEAR}
			>
				<CopyIcon className={styles.copyIcon} />
			</Button>
			<code>{text}</code>
		</pre>
	);
});

Code.displayName = 'Code';
