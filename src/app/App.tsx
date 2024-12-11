import './styles/index.scss';
import { useTheme, AppRouter } from './providers';
import { classNames } from '../shared/lib/classNames/classNames';
import { Navbar } from '../widgets/Navbar';

const App = () => {
	const { theme } = useTheme();

	return (
		<div className={classNames('app', {}, [theme])}>
			<Navbar />
			<AppRouter />
		</div>
	);
};

export default App;
