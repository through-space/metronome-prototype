import {
	assign,
	EventObject,
	fromCallback,
	MetaObject,
	sendTo,
	StateNodeConfig,
} from "xstate";
import {
	ETimerMachineState,
	ETimerStateMachineEventType,
	ITimerStateMachineContext,
} from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
import { EMetronomeEvent } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import {
	IIntervalStateMachineActorLogic,
	TTimerPlayingStateEvent,
} from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingStateInterfaces";
import { INTERVAL_ACTOR_ID } from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingStateConsts";

export const playingState: StateNodeConfig<
	ITimerStateMachineContext,
	//TODO: do I get start/stop
	// TTimerStateMachineEvent | TTimerPlayingStateEvent,
	TTimerPlayingStateEvent,
	{ src: string; logic: IIntervalStateMachineActorLogic },
	// { id: string; src: any; logic: IIntervalStateMachineActorLogic },
	never,
	never,
	never,
	string,
	never,
	EventObject,
	MetaObject
> = {
	//TODO: I don't like that id is defined outside of the state, on higher level
	id: ETimerMachineState.playingState,
	on: {
		[ETimerStateMachineEventType.STOP]: ETimerMachineState.idleState,
		[ETimerStateMachineEventType.TICK]: {
			actions: [
				sendTo(({ context }) => context.metronomeStateMachine, {
					type: EMetronomeEvent.TICK_TRIGGER,
				}),
			],
		},
	},
	invoke: [
		{
			id: INTERVAL_ACTOR_ID,
			src: fromCallback(
				({
					input: { tempo },
					system,
					self,
					sendBack,
					receive,
					emit,
				}) => {
					const delay = 60000 / tempo;
					const interval = setInterval(() => {
						sendBack({ type: ETimerStateMachineEventType.TICK });
					}, delay);
					// console.log(system);
					// sendBack({
					// 	type: EMetronomeEvent.TICK_TRIGGER,
					// });
					// sendTo(input.metronomeStateMachineRef, );

					return () => {
						clearInterval(interval);
					};
				},
			),
			input: ({ context: { tempo } }) => {
				return { tempo };
			},
		},
		// ({ con }) => {
		// 	return { src: fromCallback(() => {}) };
		// },
		// {
		// 	id: "Interval",
		// 	src: fromCallback(() => {
		// 		const interval = setInterval(() => {
		// 			console.log("Interval service ticked");
		// 		}, 2000);
		// 		console.log("service Interval invoked");
		//
		// 		// sendTo("")
		// 		return () => {
		// 			clearInterval(interval);
		// 		};
		// 	}),
		// },
		// spawnChild(fromCallback(()=>{}))
	],
	// src: "hello",
	// src: (context) => (cb) => {
	// 	const interval = setInterval(() => {
	// 		// Send the event
	// 		// cb(Event.Tick);
	// 	}, 1000);
	// 	return () => {
	// 		clearInterval(interval);
	// 	};
	// },
	// },
	entry: [
		({ context }) => {
			console.log("entering playing state");
			console.log("context", context);
		},
		// sendParent((_, event) => ({
		// 	type: "ACTION_PARENT",
		// 	data: "",
		// })),
		// sendParent({ type: "ACTION_PARENT" }),
		// sendParent({ type: "ACTION_TIMER" }),
		// assign(({ context, self }) => {
		// 	return {
		// 		timeIntervalId: getTimerInterval({
		// 			tempo: context.tempo,
		// 			onTickHandler: () => {
		// 				console.log("in handler");
		// 				sendTo(({ context }) => context.parentRef, {
		// 					type: EMetronomeEvent.TICK_TRIGGER,
		// 				});
		// 			},
		// 		}),
		// 	};
		// }),
	],

	exit: [
		({ context }) => {
			if (context.timeIntervalId) {
				clearInterval(context.timeIntervalId);
			}
		},
		assign({ timeIntervalId: null }),
	],
};
