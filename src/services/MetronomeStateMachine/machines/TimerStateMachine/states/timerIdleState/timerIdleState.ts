import { EventObject, MetaObject, StateNodeConfig } from "xstate";
import {
	ETimerMachineState,
	ETimerStateMachineEventType,
	ITimerStateMachineContext,
	TTimerStateMachineEvent,
} from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";

export const idleState: StateNodeConfig<
	ITimerStateMachineContext,
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
	on: {
		[ETimerStateMachineEventType.START]: ETimerMachineState.playingState,
	},
	// entry: ({ context }) => {
	// 	console.log("entering idle state");
	// 	console.log("context", context);
	// },
	// exit:{},
	// entry: {}
};
