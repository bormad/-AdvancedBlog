import { useTheme, AppRouter } from './providers';
import { classNames } from '../shared/lib/classNames/classNames';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import { Modal } from '../shared/ui/Modal/Modal';

const App = () => {
	const { theme } = useTheme();
	return (
		<div className={classNames('app', {}, [theme])}>
			<Navbar />
			<Modal />
			<div className='content-page'>
				<Sidebar />
				<AppRouter />
			</div>
		</div>
	);
};

export default App;
