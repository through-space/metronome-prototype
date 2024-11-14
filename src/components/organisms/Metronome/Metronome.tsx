import { SegmentsDisplay } from "@components/molecules/SegmentsDisplay/SegmentsDisplay";
import React from "react";
import { ButtonKnob } from "@components/molecules/ButtonKnob/ButtonKnob";

export const Metronome = () => {
	const handleKnobOnChange = (steps: number) => {
		console.log(steps);
	};

	const handleKnobClick = () => {
		console.log("Clicked");
	};

	return (
		<>
			<SegmentsDisplay value={"a1b2"} />
			{/*<>*/}
			{/*<h2>KnobValue: </h2>*/}
			{/*<>{knobValue}</>*/}
			{/*<h2>Direction </h2>*/}
			{/*<>{isDirectionClockwise ? "Clockwise" : "Counter Clockwise"}</>*/}
			{/*</>*/}
			<ButtonKnob
				onChange={handleKnobOnChange}
				onClick={handleKnobClick}
			/>
		</>
	);
};
