import React from 'react';
import { Counter } from '../../../entities/Counter/ui/Counter';
import { Input } from '../../../shared/ui/Input/Input';

function MainPage() {
	const [value, setValue] = React.useState('');

	const onChange = (val: string) => {
		setValue(val);
	};

	return (
		<div>
			MainPage
			<Counter />
			<Input value={value} onChange={onChange} placeholder='fgfgf' />
		</div>
	);
}

export default MainPage;
