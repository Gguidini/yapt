import { expect, test, describe } from 'vitest';
import { LoopCombinator, SingleCombinator } from './flow';

describe('Test flow', () => {
	test('test SingleCombinator', () => {
		const singleCombinator = new SingleCombinator({ name: 'focus_time', durationSeconds: 60 * 25 });
		expect(singleCombinator.value().name).toBe('focus_time');
		expect(singleCombinator.has_next()).toBe(false);
	});

	test('test LoopCombinator', () => {
		const loopCombinator = new LoopCombinator(
			[
				new SingleCombinator({ name: 'focus_time', durationSeconds: 60 * 25 }),
				new SingleCombinator({ name: 'short_pause', durationSeconds: 60 * 5 })
			],
			3
		);
		const generated_list: string[] = [];
		while (loopCombinator.has_next()) {
			generated_list.push(loopCombinator.value().name);
		}
		expect(generated_list).toStrictEqual([
			'focus_time',
			'short_pause',
			'focus_time',
			'short_pause',
			'focus_time',
			'short_pause'
		]);
	});
	test('test pomodoro flow', () => {
		const pomodoroFlow = new LoopCombinator(
			[
				new LoopCombinator(
					[
						new SingleCombinator({ name: 'focus_time', durationSeconds: 60 * 25 }),
						new SingleCombinator({ name: 'short_pause', durationSeconds: 60 * 5 })
					],
					3
				),
				new SingleCombinator({ name: 'long_pause', durationSeconds: 60 * 10 })
			],
			1
		);
		const generated_list: string[] = [];
		while (pomodoroFlow.has_next()) {
			generated_list.push(pomodoroFlow.value().name);
		}
		expect(generated_list).toStrictEqual([
			'focus_time',
			'short_pause',
			'focus_time',
			'short_pause',
			'focus_time',
			'short_pause',
			'long_pause'
		]);
	});
});
