import styles from './ThemeSwicher.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { useTheme } from '../../../app/providers';
import LightIcon from '../../../shared/assets/icons/theme-light.svg';
import DarkIcon from '../../../shared/assets/icons/theme-dark.svg';
import { Theme } from '../../../app/providers/ThemeProvider/lib/ThemeContext';
import { Button } from '../../../shared/ui';
import { ThemeButton } from '../../../shared/ui/Button/Button';

interface ThemeSwicherProps {
	className?: string;
}

export const ThemeSwicher = ({ className }: ThemeSwicherProps) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			theme={ThemeButton.CLEAR}
			onClick={toggleTheme}
			className={classNames(styles.themeSwicher, {}, [className])}
		>
			{theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
		</Button>
	);
};
