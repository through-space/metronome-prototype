import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import {
	ETimerMachineState,
	ETimerStateMachineEventType,
	ITimerStateMachineContext,
	TTimerStateMachineEvent,
} from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
import { getTimerInterval } from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingStateConsts";

export const playingState: StateNodeConfig<
	ITimerStateMachineContext,
	//TODO: do I get start/stop
	// TTimerStateMachineEvent | TTimerPlayingStateEvent,
	TTimerStateMachineEvent,
	never,
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
	},
	entry: [
		({ context }) => {
			console.log("entering playing state");
			console.log("context", context);
		},

		assign(({ context }) => {
			return {
				timeIntervalId: getTimerInterval({
					tempo: context.tempo,
					onTickHandler: context.callbacks,
				}),
			};
		}),
	],

	// exit: ({ context }) => {
	// raise();
	// if (context.timeIntervalId) {
	// clearInterval(context.timeIntervalId);
	// assign({ timeIntervalId: null });
	// }
	// },
	// exit:{},
	// entry: {}
};
