import React, { useState } from "react";
import { Knob } from "react-rotary-knob";
import {
	ButtonKnobInnerButtonWrapper,
	ButtonKnobWrapper,
} from "@components/molecules/ButtonKnob/ButtonKnobStyledComponents";
import { IButtonKnobProps } from "@components/molecules/ButtonKnob/ButtonKnobInterfaces";
import { useLongPress } from "use-long-press";

export const ButtonKnob = (props: IButtonKnobProps) => {
	const { onChange, onClick, onLongPress } = props;

	const [knobValue, setKnobValue] = useState<number>(0);

	const minKnobValue = 0;
	const maxKnobValue = 20;
	const knobStep = 1;
	const changeThreshold = Math.abs(maxKnobValue / 2);

	const handleChange = (newKnobValue: number) => {
		const roundedNewKnobValue = Math.round(newKnobValue);
		let change = roundedNewKnobValue - knobValue;

		if (!change) {
			return;
		}

		if (Math.abs(change) > changeThreshold) {
			if (change > 0) {
				change = roundedNewKnobValue - maxKnobValue - knobValue;
			} else {
				change = maxKnobValue - knobValue + roundedNewKnobValue;
			}
		}

		if (Math.abs(newKnobValue - knobValue) >= knobStep) {
			onChange(change);
			setKnobValue(roundedNewKnobValue);
		}
	};

	const bind = onLongPress && useLongPress(onLongPress, { threshold: 2000 });

	return (
		<ButtonKnobWrapper>
			<Knob
				step={1}
				onChange={handleChange}
				preciseMode={false}
				value={knobValue}
				min={minKnobValue}
				max={maxKnobValue}
			/>
			<ButtonKnobInnerButtonWrapper
				onClick={onClick}
				{...bind()}
			></ButtonKnobInnerButtonWrapper>
		</ButtonKnobWrapper>
	);
};
