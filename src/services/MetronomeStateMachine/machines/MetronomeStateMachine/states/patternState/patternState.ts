import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import {
	EMetronomeEvent,
	EStateMachineState,
	TMetronomeAction,
	TMetronomeActorLogic,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { IPatternStateContext } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/patternStateInterfaces";
import { patternChooseStepState } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/states/patternChooseStepState";
import { patternStepTypeState } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/states/patternStepTypeState";

export const patternState: StateNodeConfig<
	IPatternStateContext,
	TMetronomeEvent,
	{
		src: string;
		logic: TMetronomeActorLogic;
		id?: string;
	},
	any,
	any,
	any,
	any,
	any,
	any,
	any
	// TMetronomeAction,
	// never,
	// never,
	// string,
	// {},
	// EventObject,
	// MetaObject
> = {
	id: EStateMachineState.patternState,
	initial: "patternChooseStepState",
	on: {
		//TODO: move this to MetronomeStateMachine from here and other states
		[EMetronomeEvent.KNOB_LONG_CLICK]: {
			target: EStateMachineState.stateMenuState,
			actions: [{ type: "ON_OPEN_STATE_MENU" }],
		},
	},
	states: {
		patternChooseStepState,
		patternStepTypeState,
	},
	entry: assign(({ context }) => {
		if (context.currentEditCharIndex === undefined) {
			return {
				currentEditCharIndex: 0,
			};
		}

		return {};
	}),
};
