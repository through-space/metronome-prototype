import {
	assign,
	EventObject,
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
import {
	EMetronomeEvent,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import {
	INTERVAL_ACTOR_ID,
	intervalCallbackActorConfig,
} from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingStateConsts";
import {
	EIntervalActorEventType,
	TIntervalActorEvent,
} from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingStateInterfaces";
import { ITimerStateMachineActorLogic } from "@services/MetronomeStateMachine/actors/TimerStateMachineActor/TimerStateMachineActor";

export const playingState: StateNodeConfig<
	ITimerStateMachineContext,
	TTimerStateMachineEvent,
	{
		id: string;
		src: string;
		logic: ITimerStateMachineActorLogic;
	},
	never,
	never,
	never,
	string,
	never,
	EventObject,
	MetaObject
> = {
	id: ETimerMachineState.playingState,
	on: {
		[ETimerStateMachineEventType.STOP]: ETimerMachineState.idleState,
		[ETimerStateMachineEventType.TICK]: {
			actions: [
				// sendTo(({ context }) => context.metronomeStateMachine, {
				// 	type: EMetronomeEvent.TICK_TRIGGER,
				// }),
				// sendTo<
				// TContext extends MachineContext,
				// TExpressionEvent extends EventObject, TParams extends ParameterizedObject['params'] | undefined, TTargetActor extends AnyActorRef, TEvent extends EventObject, TDelay extends string = never, TUsedDelay extends TDelay = never>(to: TTargetActor | string | ((args: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams) => TTargetActor | string), eventOrExpr: EventFrom<TTargetActor> | SendExpr<TContext, TExpressionEvent, TParams, InferEvent<Cast<EventFrom<TTargetActor>, EventObject>>, TEvent>, options?: SendToActionOptions<TContext, TExpressionEvent, TParams, DoNotInfer<TEvent>, TUsedDelay>): ActionFunction<TContext, TExpressionEvent, TEvent, TParams, never, never, never, TDelay, never>;
				sendTo<
					ITimerStateMachineContext,
					TTimerStateMachineEvent,
					any,
					any,
					any
				>(({ context }) => context.metronomeStateMachine, {
					type: EMetronomeEvent.TICK_TRIGGER,
				}),
			],
		},
		[ETimerStateMachineEventType.SET_TEMPO]: {
			actions: [
				assign({
					tempo: ({ event }) => event.tempo,
				}),
				sendTo(INTERVAL_ACTOR_ID, ({ event }): TIntervalActorEvent => {
					return {
						type: EIntervalActorEventType.SET_TEMPO,
						newTempo: event.tempo,
					};
				}),
			],
		},
	},
	invoke: [intervalCallbackActorConfig],
};
