import { Display } from "7-segment-display/src";
import charToDigit, {
	ICharToDigit,
} from "7-segment-display/src/utils/charToDigit";
import { ISegmentsDisplayProps } from "@components/molecules/SegmentsDisplay/SegmentsDisplayInterfaces";
import { useRef, useState } from "react";
import {
	DEFAULT_BLINKING_DELAY,
	getBlinkingText,
} from "@components/molecules/SegmentsDisplay/SegmentsDisplayConsts";

export const SegmentsDisplay = (props: ISegmentsDisplayProps) => {
	const {
		value,
		blinkingChars,
		blinkingDelay = DEFAULT_BLINKING_DELAY,
	} = props;

	const [currentValue, setCurrentValue] = useState<string>(value);

	const charMap = {
		_: [0, 0, 0, 1, 0, 0, 0],
		" ": [0, 0, 0, 0, 0, 0, 0],
		"*": [1, 1, 0, 0, 0, 1, 1],
		o: [0, 0, 1, 1, 1, 0, 1],
		...charToDigit,
	} as ICharToDigit;

	const timeIntervalId = useRef<NodeJS.Timeout | null>(null);
	const blinkingText = getBlinkingText(value, blinkingChars);

	const stopBlinking = () => {
		clearInterval(timeIntervalId.current);
		timeIntervalId.current = null;
	};

	if (blinkingText) {
		// timeIntervalId.current = setInterval(() => {
		// 	setCurrentValue((prevValue) =>
		// 		prevValue === currentValue ? blinkingText : prevValue,
		// 	);
		// }, blinkingDelay);
	} else {
		stopBlinking();
	}

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
