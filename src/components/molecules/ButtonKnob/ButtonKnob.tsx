import React, { useState } from "react";
import { Knob } from "react-rotary-knob";
import {
	ButtonKnobInnerButtonWrapper,
	ButtonKnobWrapper,
} from "@components/molecules/ButtonKnob/ButtonKnobStyledComponents";
import { IButtonKnobProps } from "@components/molecules/ButtonKnob/ButtonKnobInterfaces";
import { useLongPress } from "use-long-press";
import {
	changeThreshold,
	knobStep,
	longClickThreshold,
	maxKnobValue,
	minKnobValue,
} from "@components/molecules/ButtonKnob/ButtonKnobConsts";

export const ButtonKnob = (props: IButtonKnobProps) => {
	const { onChange, onClick, onLongPress } = props;

	const [knobValue, setKnobValue] = useState<number>(0);

	const handleChange = (newKnobValue: number) => {
		const roundedNewKnobValue = Math.round(newKnobValue);
		let change = roundedNewKnobValue - knobValue;

		if (!change) {
			return;
		}

		//TODO: extract to consts
		if (Math.abs(change) > changeThreshold) {
			if (change > 0) {
				change = roundedNewKnobValue - maxKnobValue - knobValue;
			} else {
				change = maxKnobValue - knobValue + roundedNewKnobValue;
			}
		}

		if (Math.abs(newKnobValue - knobValue) >= knobStep) {
			const res = onChange && onChange(change);
			setKnobValue(roundedNewKnobValue);
		}
	};

	const longPress = useLongPress(onLongPress, {
		threshold: longClickThreshold,
	});

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
				{...longPress()}
			></ButtonKnobInnerButtonWrapper>
		</ButtonKnobWrapper>
	);
};
