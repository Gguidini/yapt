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
	max_index: number;

	constructor(inner_values: Combinator[], repeat_count: number) {
		super();
		this.inner_values = inner_values;
		this.index = 0;
		this.size = inner_values.length;
		this.max_index = this.size * repeat_count;
	}

	has_next(): boolean {
		return this.index < this.max_index;
	}

	next(): void {
		this.index += 1;
	}

	value(): ClockInfo {
		const current_combinator = this.inner_values[this.index % this.size];
		const current_value = current_combinator.value();
		if (!current_combinator.has_next()) {
			this.next();
		}
		return current_value;
	}
}
