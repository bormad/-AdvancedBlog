import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AboutPage, MainPage } from '../../../../pages';
import { routeConfig } from '../../../../shared/config/routeConfig/routeConfig';

function AppRouter() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				{Object.values(routeConfig).map(({ path, element }) => (
					<Route key={path} element={element} path={path} />
				))}
			</Routes>
		</Suspense>
	);
}

export default AppRouter;