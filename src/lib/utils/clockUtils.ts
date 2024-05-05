import type { ClockInfo, ClockName } from '../types/clock';

export const CLOCK_INFO: ClockInfo[] = [
	{ name: 'focus_time', durationSeconds: 60 * 25 },
	{ name: 'short_pause', durationSeconds: 60 * 5 },
	{ name: 'long_pause', durationSeconds: 60 * 10 }
];

export function getPaddedMinutesFromTimeInSeconds(timeSeconds: number): string {
	return ('0' + Math.floor(timeSeconds / 60)).slice(-2);
}

export function getPaddedSecondsFromTimeInSeconds(timeSeconds: number): string {
	return ('0' + (timeSeconds % 60)).slice(-2);
}

export function formatTime(timeSeconds: number): string {
	const timePieces = [getPaddedSecondsFromTimeInSeconds(timeSeconds)];
	let minutes = getPaddedMinutesFromTimeInSeconds(timeSeconds);
	const hours = getPaddedMinutesFromTimeInSeconds(Number(minutes));
	if (hours > '00') {
		minutes = getPaddedSecondsFromTimeInSeconds(Number(minutes));
		timePieces.push(minutes, hours);
	} else {
		timePieces.push(minutes);
	}
	return timePieces.reverse().join(':');
}

export function formatClockName(clockName: ClockName): string {
	const parts = clockName.split('_');
	let first_part = parts[0];
	if (first_part !== undefined) {
		first_part = first_part?.charAt(0).toUpperCase() + first_part.slice(1);
	}
	return first_part + ' ' + parts.splice(1).join(' ');
}
