import { useCallback, useEffect, useRef, useState } from "react";
export var useBlinking = function (originalValue, blinkingDelay) {
    var timeIntervalId = useRef(null);
    var _a = useState(originalValue), currentValue = _a[0], setCurrentValue = _a[1];
    useEffect(function () {
        setCurrentValue(originalValue);
    }, [originalValue]);
    var stopBlinking = useCallback(function () {
        if (!timeIntervalId.current) {
            return;
        }
        clearInterval(timeIntervalId.current);
        timeIntervalId.current = null;
    }, [timeIntervalId]);
    var startBlinking = useCallback(function (text, blinkingText) {
        stopBlinking();
        setCurrentValue(text);
        if (blinkingText === originalValue) {
            return;
        }
        timeIntervalId.current = setInterval(function () {
            setCurrentValue(function (prevValue) {
                return prevValue === text ? blinkingText : text;
            });
        }, blinkingDelay);
    }, [blinkingDelay, originalValue, stopBlinking]);
    return { startBlinking: startBlinking, stopBlinking: stopBlinking, currentValue: currentValue };
};
