export const DEFAULT_BLINKING_DELAY = 500;

export const getBlinkingText = (
	originalText: string,
	blinkingChars: number[],
): string => {
	if (!blinkingChars || !blinkingChars.length || !originalText) {
		return "";
	}

	return originalText
		.split("")
		.map((char: string, index) =>
			blinkingChars.includes(index) ? " " : char,
		)
		.join("");
};
