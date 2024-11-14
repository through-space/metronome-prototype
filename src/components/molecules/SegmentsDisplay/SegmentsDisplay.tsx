import { Display } from "7-segment-display/src";
import charToDigit from "7-segment-display/src/utils/charToDigit";
import { ISegmentsDisplayProps } from "@components/molecules/SegmentsDisplay/SegmentsDisplayInterfaces";

export const SegmentsDisplay = (props: ISegmentsDisplayProps) => {
	const { value } = props;
	const charMap = {
		...charToDigit,
		_: [0, 0, 0, 1, 0, 0, 0],
		" ": [0, 0, 0, 0, 0, 0, 0],
	};
	return (
		<>
			<Display count={4} value={value} charMap={charMap} height={70} />
		</>
	);
};
