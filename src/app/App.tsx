import { useTheme, AppRouter } from './providers';
import { classNames } from '../shared/lib/classNames/classNames';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import { Modal } from '../shared/ui/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userActions } from '../entities/User';
import { getUserInited } from '../entities/User/model/selectors/getUserInited/getUserInited';

const App = () => {
	const { theme } = useTheme();
	const dispatch = useDispatch();
	const inited = useSelector(getUserInited);

	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);

	return (
		<div className={classNames('app', {}, [theme])}>
			<Navbar />
			<Modal />
			<div className='content-page'>
				<Sidebar />
				{inited && <AppRouter />}
			</div>
		</div>
	);
};

export default App;
