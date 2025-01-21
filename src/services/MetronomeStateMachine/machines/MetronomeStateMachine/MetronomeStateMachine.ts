import { assign, sendTo, setup } from "xstate";
import {
	INIT_METRONOME_STATE,
	SINGLE_TIMER_MACHINE_ID,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineConsts";
import {
	EMetronomeEvent,
	EStateMachineState,
	IMetronomeContext,
	TMetronomeActorLogic,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { TimerStateMachine } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachine";
import { tempoState } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/tempoState/tempoState";
import { stateMenuState } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/stateMenuState/stateMenuState";
import { patternState } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/patternState";
import { ParameterizedObject } from "xstate/dist/declarations/src/types";
import { ETimerStateMachineEventType } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
import { context } from "esbuild";

export const MetronomeStateMachine = setup<
	IMetronomeContext,
	TMetronomeEvent,
	Record<string, TMetronomeActorLogic>,
	Record<string, string>,
	Record<string, ParameterizedObject["params"] | undefined>,
	Record<EMetronomeEvent, TMetronomeEvent>
>({
	actors: {},
	actions: {
		ON_OPEN_STATE_MENU: assign({
			lastState: ({ self }) => {
				return self.getSnapshot().value.toString();
			},
		}),
	},
}).createMachine({
	initial: EStateMachineState.tempoState,
	entry: [
		assign({
			timerStateMachineRef: ({ spawn, self }) =>
				spawn(TimerStateMachine, {
					id: SINGLE_TIMER_MACHINE_ID,
					input: {
						metronomeStateMachine: self,
					},
				}),
		}),
	],
	on: {
		[EMetronomeEvent.START_STOP_CLICK]: {
			actions: [
				sendTo(SINGLE_TIMER_MACHINE_ID, ({ context }) => {
					return {
						type: context.isPlaying
							? ETimerStateMachineEventType.STOP
							: ETimerStateMachineEventType.START,
					};
				}),
				assign(({ context }) => {
					return {
						isPlaying: !context.isPlaying,
						currentStep: -1, //Offset for first click
					};
				}),
			],
		},
		[EMetronomeEvent.TICK_TRIGGER]: {
			actions: [
				assign(({ context: { tickTrigger, currentStep, pattern } }) => {
					return {
						tickTrigger: !tickTrigger,
						currentStep: (currentStep + 1) % pattern.length,
					};
				}),
			],
		},
	},
	context: INIT_METRONOME_STATE,
	states: {
		tempoState,
		stateMenuState,
		patternState,
		// patternChooseStepState,
	},
});
