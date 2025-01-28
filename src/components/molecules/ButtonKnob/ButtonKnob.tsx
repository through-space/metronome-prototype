import React, { useState } from "react";
import { Knob } from "react-rotary-knob";
import {
	ButtonKnobInnerButtonWrapper,
	ButtonKnobWrapper,
} from "@components/molecules/ButtonKnob/ButtonKnobStyledComponents";
import { useLongPress } from "use-long-press";
import {
	getAdjustedNewKnobValue,
	getKnobChangeValue,
	KNOB_STEP,
	LONG_CLICK_THRESHOLD,
	MAX_KNOB_VALUE,
	MIN_KNOB_VALUE,
} from "@components/molecules/ButtonKnob/ButtonKnobConsts";
import { MetronomeStateMachineContext } from "@context/MetronomeMachineContext/MetronomeMachineContext";
import { EMetronomeEvent } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";

export const ButtonKnob = () => {
	const metronomeMachineRef = MetronomeStateMachineContext.useActorRef();

	const [knobValue, setKnobValue] = useState<number>(0);

	const longPress = useLongPress(
		() => {
			metronomeMachineRef.send({ type: EMetronomeEvent.KNOB_LONG_CLICK });
		},
		{
			threshold: LONG_CLICK_THRESHOLD,
		},
	);

	const handleKnobTurn = (newKnobValue: number) => {
		const change = getKnobChangeValue(knobValue, newKnobValue);

		if (Math.abs(newKnobValue - knobValue) < KNOB_STEP || change === 0) {
			return;
		}

		const calculatedNewKnobValue = getAdjustedNewKnobValue(newKnobValue);
		setKnobValue(calculatedNewKnobValue);

		metronomeMachineRef.send({
			type: EMetronomeEvent.KNOB_TURN,
			change,
		});
	};

	return (
		<ButtonKnobWrapper>
			<Knob
				step={1}
				onChange={handleKnobTurn}
				preciseMode={false}
				value={knobValue}
				min={MIN_KNOB_VALUE}
				max={MAX_KNOB_VALUE}
			/>
			<ButtonKnobInnerButtonWrapper
				onClick={() =>
					metronomeMachineRef.send({
						type: EMetronomeEvent.KNOB_CLICK,
					})
				}
				{...longPress()}
			></ButtonKnobInnerButtonWrapper>
		</ButtonKnobWrapper>
	);
};
