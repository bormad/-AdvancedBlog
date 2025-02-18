import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '../../../../shared/ui/PageLoader/PageLoader';
import {
	AppRouteProps,
	routeConfig
} from '../../../../shared/config/routeConfig/routeConfig';
import { RequireAuth } from './RequireAuth';

function AppRouter() {
	const renderWithWrapper = useCallback((route: AppRouteProps) => {
		const element = (
			<Suspense fallback={<PageLoader />}>
				<div className='page-wrapper'>{route.element}</div>
			</Suspense>
		);

		return (
			<Route
				key={route.path}
				element={
					route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
				}
				path={route.path}
			/>
		);
	}, []);

	return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
}

export default memo(AppRouter);
