import { Display } from "7-segment-display/src";
import charToDigit, {
	ICharToDigit,
} from "7-segment-display/src/utils/charToDigit";
import { ISegmentsDisplayProps } from "@components/molecules/SegmentsDisplay/SegmentsDisplayInterfaces";
import { useEffect } from "react";
import {
	DEFAULT_BLINKING_DELAY,
	getBlinkingText,
} from "@components/molecules/SegmentsDisplay/SegmentsDisplayConsts";
import { useBlinking } from "@components/molecules/SegmentsDisplay/hooks/useBlinking";

export const SegmentsDisplay = (props: ISegmentsDisplayProps) => {
	const {
		value: originalValue,
		blinkingChars,
		blinkingDelay = DEFAULT_BLINKING_DELAY,
	} = props;

	const { startBlinking, stopBlinking, currentValue } = useBlinking(
		originalValue,
		blinkingDelay,
	);

	const charMap = {
		_: [0, 0, 0, 1, 0, 0, 0],
		" ": [0, 0, 0, 0, 0, 0, 0],
		"*": [1, 1, 0, 0, 0, 1, 1],
		o: [0, 0, 1, 1, 1, 0, 1],
		...charToDigit,
	} as ICharToDigit;

	useEffect(() => {
		if (blinkingChars && blinkingChars.length) {
			const blinkingText = getBlinkingText(originalValue, blinkingChars);
			startBlinking(blinkingText);
		}

		return () => {
			stopBlinking();
		};
	}, [originalValue, blinkingChars, blinkingDelay]);

	return (
		<Display
			count={4}
			value={currentValue}
			charMap={charMap}
			height={70}
			color="red"
			skew={false}
			shiftText={" "}
			isEmptyCharLeft={false}
		/>
	);
};
