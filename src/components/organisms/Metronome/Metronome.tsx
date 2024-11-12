import { SegmentsDisplay } from "@components/molecules/SegmentsDisplay/SegmentsDisplay";
import { Knob } from "react-rotary-knob";
import React, { useState } from "react";

export const Metronome = () => {
	const [knobValue, setKnobValue] = useState<number>(0);

	const handleChange = (knobValue: number) => {
		setKnobValue(knobValue);
	};

	return (
		<>
			<SegmentsDisplay value={"_   "} />
			<>
				<h2>KnobValue: </h2>
				<>{knobValue}</>
			</>
			<Knob step={1} onChange={handleChange} preciseMode={false} />
		</>
	);
};
