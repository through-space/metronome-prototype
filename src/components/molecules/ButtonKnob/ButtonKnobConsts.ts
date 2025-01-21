const getCalculatedThreshold = (
	minKnobValue: number,
	maxKnobValue: number,
	maxDegree: number,
) => {
	const range = maxKnobValue - minKnobValue;
	const thresholdPart = maxDegree / 360;

	return range * thresholdPart;
};

export const getKnobChangeValue = (
	previousValue: number,
	newValue: number,
): number => {
	const roundedNewValue = Math.round(newValue);
	const change = roundedNewValue - previousValue;

	if (Math.abs(change) < changeThreshold) {
		return change;
	}

	/**
	 * This worked. but what for?
	 * Smooth turning.
	 * Imitating smooth value changes
	 * Preventing Mouse Cursor's ability to turn knob >X degrees.
	 * Preventing large change when passing 0 degrees
	 */
	if (change > 0) {
		return Math.round(roundedNewValue - MAX_KNOB_VALUE - previousValue);
	} else {
		return Math.round(MAX_KNOB_VALUE - previousValue + roundedNewValue);
	}
};

export const getAdjustedNewKnobValue = (newKnobValue: number) => {
	return Math.round(newKnobValue);
};

export const MIN_KNOB_VALUE = 0;
export const MAX_KNOB_VALUE = 20;
export const KNOB_STEP = 1;

export const LONG_CLICK_THRESHOLD = 1000;

const CHANGE_THRESHOLD_DEGREE = 90;

const changeThreshold = getCalculatedThreshold(
	MIN_KNOB_VALUE,
	MAX_KNOB_VALUE,
	CHANGE_THRESHOLD_DEGREE,
);
