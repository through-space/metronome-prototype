var getCalculatedThreshold = function (minKnobValue, maxKnobValue, maxDegree) {
    var range = maxKnobValue - minKnobValue;
    var thresholdPart = maxDegree / 360;
    return range * thresholdPart;
};
export var getKnobChangeValue = function (previousValue, newValue) {
    var roundedNewValue = Math.round(newValue);
    var change = roundedNewValue - previousValue;
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
    }
    else {
        return Math.round(MAX_KNOB_VALUE - previousValue + roundedNewValue);
    }
};
export var getAdjustedNewKnobValue = function (newKnobValue) {
    return Math.round(newKnobValue);
};
export var MIN_KNOB_VALUE = 0;
export var MAX_KNOB_VALUE = 20;
export var KNOB_STEP = 1;
export var LONG_CLICK_THRESHOLD = 1000;
var CHANGE_THRESHOLD_DEGREE = 90;
var changeThreshold = getCalculatedThreshold(MIN_KNOB_VALUE, MAX_KNOB_VALUE, CHANGE_THRESHOLD_DEGREE);
