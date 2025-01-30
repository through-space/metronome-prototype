export var DEFAULT_BLINKING_DELAY = 500;
export var getBlinkingText = function (originalText, blinkingChars) {
    if (!blinkingChars || !blinkingChars.length || !originalText) {
        return "";
    }
    return originalText
        .split("")
        .map(function (char, index) {
        return blinkingChars.includes(index) ? " " : char;
    })
        .join("");
};
