import {
	assign,
	EventObject,
	MetaObject,
	StateNodeConfig,
	UnknownActorLogic,
} from "xstate";
import {
	EMetronomeEvent,
	IMetronomeContext,
	TMetronomeAction,
	TMetronomeActorLogic,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import {
	getTempoDisplay,
	getUpdatedTempo,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/tempoState/tempoStateConsts";
import { IStateMenuContext } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/stateMenuState/stateMenuInterfaces";

export const tempoState: StateNodeConfig<
	IMetronomeContext,
	TMetronomeEvent,
	{
		src: string;
		logic: TMetronomeActorLogic;
		id?: string;
	},
	TMetronomeAction,
	// any,
	// any,
	any,
	any,
	any,
	any,
	any,
	any
	// { src: string; logic: UnknownActorLogic; id: string },
	// any,
	// any,
	// string,
	// {},
	// EventObject,
	// MetaObject

	// IMetronomeContext,
	// TMetronomeEvent,
	// ProvidedActor,
	// // { src: string; logic: ITimerStateMachineActorLogic; id: string },
	// TMetronomeAction,
	// any,
	// never,
	// string,
	// {},
	// EventObject,
	// MetaObject
> = {
	// id: EStateMachineState.tempoState,
	// initial: {},
	on: {
		[EMetronomeEvent.KNOB_TURN]: {
			actions: assign(({ context, event }) => {
				const newTempo = getUpdatedTempo(context.tempo, event.value);
				return {
					...context,
					tempo: newTempo,
					display: {
						...context.display,
						text: newTempo.toString(),
					},
				};
			}),
		},
		[EMetronomeEvent.KNOB_CLICK]: {},
		[EMetronomeEvent.KNOB_LONG_CLICK]: {
			target: "stateMenuState",
			actions: [{ type: "ON_OPEN_STATE_MENU" }],
		},
	},
	entry: assign(({ context }) => {
		return {
			...context,
			display: {
				...context.display,
				text: getTempoDisplay({ context }).value,
				blinkingChars: [],
			},
		};
	}),
};
