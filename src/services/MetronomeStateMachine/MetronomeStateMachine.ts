import { assign, createMachine } from "xstate";
import { INIT_METRONOME_STATE } from "@services/MetronomeStateMachine/MetronomeStateMachineConsts";
import {
	EStateMachineState,
	IMetronomeContext,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { tempoState } from "@services/MetronomeStateMachine/states/tempoState/tempoState";
import { stateMenuState } from "@services/MetronomeStateMachine/states/stateMenuState/stateMenuState";
import { patternState } from "@services/MetronomeStateMachine/states/patternState/patternState";

export const MetronomeStateMachine = createMachine(
	{
		types: {
			context: {} as IMetronomeContext,
			events: {} as TMetronomeEvent,
		},
		// initial: EStateMachineState.tempoState,
		initial: EStateMachineState.patternState,
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
			stateMenuState,
			patternState,
		},
	},
	{
		actions: {
			ON_OPEN_STATE_MENU: assign({
				lastState: ({ self }) => {
					return self.getSnapshot().value.toString();
				},
			}),
		},
	},
);
