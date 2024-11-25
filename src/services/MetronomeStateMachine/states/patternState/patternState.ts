import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import {
	IMetronomeContext,
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { getUpdatedTempo } from "@services/MetronomeStateMachine/states/tempoState/tempoStateConsts";

export const patternState: StateNodeConfig<
	IMetronomeContext,
	TMetronomeEvent,
	never,
	TMetronomeAction,
	never,
	never,
	string,
	{},
	EventObject,
	MetaObject
> = {
	on: {
		"knob.turn": {
			actions: () => {
				console.log("knob turn in patterState");
			},
		},
		"knob.longclick": {
			target: "stateMenuState",
			actions: [{ type: "ON_OPEN_STATE_MENU" }],
		},
	},
};