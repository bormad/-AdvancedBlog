import { useTheme, AppRouter } from './providers';
import { classNames } from '../shared/lib/classNames/classNames';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import { Modal } from '../shared/ui/Modal/Modal';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userActions } from '../entities/User';

const App = () => {
	const { theme } = useTheme();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);

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
