import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from './Sidebar';

describe('classNames', () => {
	test('sidebar test', () => {
		render(<Sidebar />);
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
	});

	test('test toggle', () => {
		render(<Sidebar />);
		const toggleBtn = screen.getByTestId('sidebar-toggle');
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
		fireEvent.click(toggleBtn);
		expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
	});
});
