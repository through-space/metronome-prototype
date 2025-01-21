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
	TTimerStateMachineEvent,
} from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
import { EMetronomeEvent } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { INTERVAL_ACTOR_ID } from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingStateConsts";

export const playingState: StateNodeConfig<
	ITimerStateMachineContext,
	//TODO: do I get start/stop
	// TTimerStateMachineEvent | TTimerPlayingStateEvent,
	TTimerStateMachineEvent,
	//TODO: remove any
	any,
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
					sendBack({ type: ETimerStateMachineEventType.TICK });
					const interval = setInterval(() => {
						sendBack({ type: ETimerStateMachineEventType.TICK });
					}, delay);

					return () => {
						clearInterval(interval);
					};
				},
			),
			input: ({ context: { tempo } }) => {
				return { tempo };
			},
		},
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
