var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { Display } from "7-segment-display/src";
import charToDigit from "7-segment-display/src/utils/charToDigit";
import { useEffect } from "react";
import { DEFAULT_BLINKING_DELAY, getBlinkingText, } from "@components/atoms/SegmentsDisplay/SegmentsDisplayConsts";
import { useBlinking } from "@components/atoms/SegmentsDisplay/hooks/useBlinking";
export var SegmentsDisplay = function (props) {
    var originalValue = props.value, blinkingChars = props.blinkingChars, _a = props.blinkingDelay, blinkingDelay = _a === void 0 ? DEFAULT_BLINKING_DELAY : _a;
    var _b = useBlinking(originalValue, blinkingDelay), startBlinking = _b.startBlinking, stopBlinking = _b.stopBlinking, currentValue = _b.currentValue;
    var charMap = __assign({ _: [0, 0, 0, 1, 0, 0, 0], " ": [0, 0, 0, 0, 0, 0, 0], "*": [1, 1, 0, 0, 0, 1, 1], o: [0, 0, 1, 1, 1, 0, 1] }, charToDigit);
    useEffect(function () {
        if (blinkingChars && blinkingChars.length) {
            var blinkingText = getBlinkingText(originalValue, blinkingChars);
            startBlinking(originalValue, blinkingText);
        }
        return function () {
            stopBlinking();
        };
    }, [
        originalValue,
        blinkingChars,
        blinkingDelay,
        startBlinking,
        stopBlinking,
    ]);
    return (_jsx(Display, { count: 4, value: currentValue, charMap: charMap, height: 70, color: "red", skew: false, shiftText: " ", isEmptyCharLeft: false }));
};
