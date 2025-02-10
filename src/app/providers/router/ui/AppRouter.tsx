import { memo, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../../../../shared/config/routeConfig/routeConfig';
import { PageLoader } from '../../../../shared/ui/PageLoader/PageLoader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '../../../../entities/User';

function AppRouter() {
	const isAuth = useSelector(getUserAuthData);

	const route = useMemo(() => {
		return Object.values(routeConfig).filter((route) => {
			if (route.authOnly && !isAuth) {
				return false;
			}

			return true;
		});
	}, [isAuth]);

	return (
		<Suspense fallback={<PageLoader />}>
			<Routes>
				{route.map(({ path, element }) => (
					<Route
						key={path}
						element={<div className='page-wrapper'>{element}</div>}
						path={path}
					/>
				))}
			</Routes>
		</Suspense>
	);
}

export default memo(AppRouter);
