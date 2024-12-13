import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button, ThemeButton } from './Button';

describe('classNames', () => {
	test('button test', () => {
		render(<Button>Test</Button>);
		expect(screen.getByText('Test')).toBeInTheDocument();
	});
	test('button test', () => {
		render(<Button theme={ThemeButton.CLEAR}>Test</Button>);
		expect(screen.getByText('Test')).toHaveClass('clear');
	});
});
