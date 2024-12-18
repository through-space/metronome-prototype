import { assign, createMachine } from "xstate";
import { INIT_METRONOME_STATE } from "@services/MetronomeStateMachine/MetronomeStateMachineConsts";
import {
	EMetronomeEvent,
	EStateMachineState,
	IMetronomeContext,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { tempoState } from "@services/MetronomeStateMachine/states/tempoState/tempoState";
import { stateMenuState } from "@services/MetronomeStateMachine/states/stateMenuState/stateMenuState";
import { patternState } from "@services/MetronomeStateMachine/states/patternState/patternState";
import { patternChooseStepState } from "@services/MetronomeStateMachine/states/patternState/states/patternChooseStepState";

export const MetronomeStateMachine = createMachine(
	{
		types: {
			context: {} as IMetronomeContext,
			events: {} as TMetronomeEvent,
		},
		initial: EStateMachineState.tempoState,
		on: {
			[EMetronomeEvent.START_STOP_CLICK]: {
				actions: assign(({ context }) => {
					return {
						isPlaying: !context.isPlaying,
					};
				}),
			},
			[EMetronomeEvent.TICK_TRIGGER]: {
				actions: assign(({ context }) => {
					return { tickTrigger: !context.tickTrigger };
				}),
			},
		},
		context: INIT_METRONOME_STATE,
		states: {
			tempoState,
			stateMenuState,
			patternState,
			patternChooseStepState,
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
