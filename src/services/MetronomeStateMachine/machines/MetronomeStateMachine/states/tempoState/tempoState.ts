import { assign, enqueueActions, sendTo, StateNodeConfig } from "xstate";
import {
	EMetronomeEvent,
	IMetronomeContext,
	IMetronomeStateMachineActorLogic,
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import {
	getTempoDisplay,
	getUpdatedTempo,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/tempoState/tempoStateConsts";
import { ETimerStateMachineEventType } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";

// const getUpdateTempoActions = ({
// 	prevTempo,
// 	change,
// }: {
// 	prevTempo: number;
// 	change: number;
// }) => {
// 	const newTempo = getUpdatedTempo(prevTempo, change);
// 	return [
// 		assign(({ context, event }) => {
// 			return {
// 				...context,
// 				tempo: newTempo,
// 				display: {
// 					...context.display,
// 					text: newTempo.toString(),
// 				},
// 			};
// 		}),
//
// 		sendTo(
// 			({ context: { timerStateMachineRef } }) => timerStateMachineRef,
// 			({ context: { tempo } }) => {
// 				return {
// 					type: ETimerStateMachineEventType.SET_TEMPO,
// 					tempo,
// 				};
// 			},
// 		),
// 	];
// };

export const tempoState: StateNodeConfig<
	IMetronomeContext,
	TMetronomeEvent,
	{
		src: string;
		logic: IMetronomeStateMachineActorLogic;
		id: string;
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
			// actions: [
			// 	//TODO: Not sure these are imperative
			// 	assign(({ context, event }) => {
			// 		const newTempo = getUpdatedTempo(
			// 			context.tempo,
			// 			event.value,
			// 		);
			// 		return {
			// 			...context,
			// 			tempo: newTempo,
			// 			display: {
			// 				...context.display,
			// 				text: newTempo.toString(),
			// 			},
			// 		};
			// 	}),
			//
			// 	sendTo(
			// 		({ context: { timerStateMachineRef } }) =>
			// 			timerStateMachineRef,
			// 		({ context: { tempo } }) => {
			// 			return {
			// 				type: ETimerStateMachineEventType.SET_TEMPO,
			// 				tempo,
			// 			};
			// 		},
			// 	),
			// ],

			actions: enqueueActions(
				({
					context: { tempo, display, timerStateMachineRef },
					event: { change },
					enqueue,
				}) => {
					const newTempo = getUpdatedTempo(tempo, change);

					enqueue.assign({ tempo: newTempo });
					enqueue.assign({
						display: { ...display, text: newTempo.toString() },
					});
					enqueue.sendTo(timerStateMachineRef, {
						type: ETimerStateMachineEventType.SET_TEMPO,
						tempo: newTempo,
					});
				},
			),
			// Newer version

			// actions: enqueueActions(({ enqueue, context, event }) => {
			// 	const newTempo = getUpdatedTempo(context.tempo, event.value);

			// enqueue.sendTo();

			// enqueue(
			// 	assign(({ context, event }) => {
			// 		const newTempo = getUpdatedTempo(
			// 			context.tempo,
			// 			event.value,
			// 		);
			// 		return {
			// 			// ...context,
			// 			tempo: newTempo,
			// 			display: {
			// 				...context.display,
			// 				text: newTempo.toString(),
			// 			},
			// 		};
			// 	}),
			// 	sendTo(
			// 		({ context: { timerStateMachineRef } }) =>
			// 			timerStateMachineRef,
			// 		({ context: { tempo } }) => {
			// 			return {
			// 				type: ETimerStateMachineEventType.SET_TEMPO,
			// 				tempo,
			// 			};
			// 		},
			// 	),
			// );
			// enqueue;
			// }),

			// ]),
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
