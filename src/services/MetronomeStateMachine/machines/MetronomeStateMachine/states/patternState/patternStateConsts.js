import { EStep } from "@config/commonInterfaces";
var EMPTY_CHAR = " ";
export var patternCharMap = new Map([
    [EStep.HIGH, "*"],
    [EStep.LOW, "o"],
    [EStep.PAUSE, "_"],
]);
export var stepTypes = Array.from(patternCharMap.keys());
export var getDisplayChar = function (step) {
    return patternCharMap.has(step) ? patternCharMap.get(step) : EMPTY_CHAR;
};
export var getPatternDisplay = function (_a) {
    var pattern = _a.context.pattern;
    return {
        value: pattern.map(function (step) { return getDisplayChar(step); }).join(""),
        blinkingChars: [0],
    };
};
