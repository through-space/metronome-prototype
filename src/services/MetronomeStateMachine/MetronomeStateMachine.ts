import { assign, createActor, createMachine } from "xstate";
import {
	getUpdatedTempo,
	INIT_METRONOME_STATE,
} from "@services/MetronomeStateMachine/MetronomeStateMachineConsts";
import {
	EStateMachineState,
	IKnobTurnEvent,
	IMetronomeContext,
	IStartStopButtonClick,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { tempoState } from "@services/MetronomeStateMachine/states/tempoState";

export const MetronomeStateMachine = createMachine({
	initial: EStateMachineState.tempoState,
	types: {
		context: {} as IMetronomeContext,
		events: {} as IKnobTurnEvent | IStartStopButtonClick,
	},
	on: {
		"startStopButton.click": {
			actions: assign(({ context }) => {
				return {
					isPlaying: !context.isPlaying,
				};
			}),
		},
	},
	context: INIT_METRONOME_STATE,
	states: {
		tempoState,
	},
});

// export const metronomeActor = createActor(MetronomeStateMachine).start();
