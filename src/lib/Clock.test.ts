import { render, screen, waitFor, cleanup } from '@testing-library/svelte';
// import userEvent from '@testing-library/user-event';
import { expect, test, vi, afterEach } from 'vitest';
import Clock from '$lib/Clock.svelte';
import userEvent from '@testing-library/user-event';

afterEach(() => {
	cleanup();
});

test('Clock component', () => {
	render(Clock, {
		clockName: 'focus_time',
		durationSeconds: 10 * 60
	});
	const clockTime = screen.queryByText(/10:00/iu);
	expect(clockTime).toBeTruthy();
	expect(clockTime?.tagName).toBe('DIV');
});

test('Clock emits clock_complete when complete', async () => {
	// TODO: Use fake timers
	const user = userEvent.setup();
	const clockCompleteSpy = vi.fn();
	const clockStartedSpy = vi.fn();
	const { component } = render(Clock, {
		clockName: 'focus_time',
		durationSeconds: 1 // 1 second clock
	});
	component.$on('clock_complete', clockCompleteSpy);
	component.$on('clock_started', clockStartedSpy);
	// Click the button
	const button = screen.getByRole('button');
	await user.click(button);
	// Clicking the button triggers the 'clock_started' event
	expect(clockStartedSpy).toHaveBeenCalledOnce();
	// Assert that after some time (1 second)
	// The 'clock_complete' event is triggered
	await waitFor(() => {
		expect(clockCompleteSpy).toHaveBeenCalledOnce();
		const args = clockCompleteSpy.mock.calls[0];
		expect(args[0].detail).toStrictEqual({
			totalDuration: 1,
			duration: 1,
			clock: 'focus_time',
			was_manual_reset: false
		});
		expect(args[0].type).toBe('clock_complete');
	});
});
