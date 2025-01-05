import { setup } from "xstate";
import {
	ETimerMachineState,
	ITimerStateMachineContext,
	TTimerStateMachineEvent,
} from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
import { DEFAULT_TIMER_CONTEXT } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineConsts";
import { idleState } from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerIdleState/timerPlayingState";
import { playingState } from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingState";

export const TimerStateMachine = setup<
	ITimerStateMachineContext,
	TTimerStateMachineEvent
	// any
	// Record<string, UnknownActorLogic>,
	// Record<string, string>,
	// Record<string, ParameterizedObject["params"] | undefined>,
	// Record<string, ParameterizedObject["params"] | undefined>,
	// string,
	// string,
	// NonReducibleUnknown,
	// NonReducibleUnknown,
	// EventObject,
	// MetaObject
>({}).createMachine({
	initial: ETimerMachineState.idleState,
	context: ({ input }) => ({
		...DEFAULT_TIMER_CONTEXT,
		...input,
	}),
	entry: () => {
		console.log("TimerStateMachine on entry");
	},
	states: { idleState, playingState },
});
