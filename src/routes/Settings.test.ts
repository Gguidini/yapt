import { render, screen, cleanup } from '@testing-library/svelte';
// import userEvent from '@testing-library/user-event';
import { expect, test, afterEach } from 'vitest';
import Settings from './Settings.svelte';
import type { ClockInfo } from '$lib/types/clock';
import { formatClockName, formatTime } from '$lib/utils/clockUtils';

afterEach(() => {
	cleanup();
});

const CLOCK_INFO: ClockInfo[] = [
	{ name: 'focus_time', durationSeconds: 1 },
	{ name: 'short_pause', durationSeconds: 300 },
	{ name: 'long_pause', durationSeconds: 1000 }
];

test('Settings component rendering', () => {
	render(Settings, {
		clockInfo: CLOCK_INFO,
		isClockRunning: false
	});

	const clock_type_selector = screen.queryByTitle('clock_type_selector');
	expect(clock_type_selector).toBeTruthy();
	expect(clock_type_selector?.childElementCount).toBe(3);

	for (const clockInfo of CLOCK_INFO) {
		const input = screen.queryByLabelText(
			`${formatClockName(clockInfo.name)} (${formatTime(clockInfo.durationSeconds)})`
		);
		expect(input).toBeTruthy();
		expect(input).toHaveProperty('disabled', false);
	}
});
