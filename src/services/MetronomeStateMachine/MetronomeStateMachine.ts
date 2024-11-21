import { assign, createActor, createMachine } from "xstate";
import { EStep } from "@hooks/useTimer/useTimerInterfaces";
import { getUpdatedTempo } from "@services/MetronomeStateMachine/MetronomeStateMachineConsts";
import { DEFAULT_TEMPO } from "@config/MetronomeConfig";

interface IKnobTurnEvent {
	type: "knob.turn";
	value: number;
}

interface IMetronomeContext {
	tempo: number;
	pattern: EStep[];
	displayText: string;
}

const MetronomeStateMachine = createMachine({
	types: {
		context: {} as IMetronomeContext,
		events: {} as IKnobTurnEvent,
	},
	context: {
		tempo: DEFAULT_TEMPO,
		pattern: [EStep.HIGH, EStep.LOW, EStep.LOW, EStep.LOW],
		displayText: DEFAULT_TEMPO.toString(),
	},
	states: {
		tempoState: {
			on: {
				"knob.turn": {
					actions: assign(({ context, event }) => {
						const newTempo = getUpdatedTempo(
							context.tempo,
							event.value,
						);
						return {
							tempo: newTempo,
							displayText: newTempo.toString(), // Use the calculated tempo
						};
					}),
				},
			},
		},
	},
});

export const metronomeActor = createActor(MetronomeStateMachine).start();
