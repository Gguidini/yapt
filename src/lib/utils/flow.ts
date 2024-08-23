import type { ClockInfo } from '$lib/types/clock';

export abstract class Combinator {
	has_next(): boolean {
		return false;
	}

	abstract next(): void;

	abstract value(): ClockInfo;
}

export class SingleCombinator extends Combinator {
	clock: ClockInfo;

	constructor(clock: ClockInfo) {
		super();
		this.clock = clock;
	}

	has_next(): boolean {
		return false;
	}

	next() {}

	value(): ClockInfo {
		return this.clock;
	}
}

export class LoopCombinator extends Combinator {
	inner_values: Combinator[];
	index: number;
	size: number;
	loops_executed: number;
	repeat_count: number | undefined;

	constructor(inner_values: Combinator[], repeat_count: number | undefined = undefined) {
		super();
		this.inner_values = inner_values;
		this.index = 0;
		this.size = inner_values.length;
		this.loops_executed = 0;
		this.repeat_count = repeat_count;
	}

	has_next(): boolean {
		return !(this.loops_executed == this.repeat_count);
	}

	next(): void {
		this.index = (this.index + 1) % this.size;
		if (this.index == 0) {
			this.loops_executed += 1;
		}
	}

	value(): ClockInfo {
		const current_combinator = this.inner_values[this.index % this.size];
		const current_value = current_combinator.value();
		if (!current_combinator.has_next()) {
			// inner combinator doesn't have another value
			this.next();
		}
		return current_value;
	}
}
