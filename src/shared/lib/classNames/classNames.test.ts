import { classNames } from './classNames';

describe('classNames', () => {
	test('with only firs param', () => {
		expect(classNames('someClass')).toBe('someClass');
	});
	test('with mods class', () => {
		expect(classNames('someClass', { cls1: false, cls2: true })).toBe(
			'someClass cls2'
		);
	});
	test('with additional class', () => {
		expect(classNames('someClass', {}, ['cls1'])).toBe('someClass cls1');
	});
});
