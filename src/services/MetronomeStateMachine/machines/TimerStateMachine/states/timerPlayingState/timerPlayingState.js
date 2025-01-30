var _a;
import { assign, sendTo, } from "xstate";
import { ETimerMachineState, ETimerStateMachineEventType, } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
import { EMetronomeEvent, } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { INTERVAL_ACTOR_ID, intervalCallbackActorConfig, } from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingStateConsts";
import { EIntervalActorEventType, } from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingStateInterfaces";
export var playingState = {
    id: ETimerMachineState.playingState,
    on: (_a = {},
        _a[ETimerStateMachineEventType.STOP] = ETimerMachineState.idleState,
        _a[ETimerStateMachineEventType.TICK] = {
            actions: [
                // sendTo(({ context }) => context.metronomeStateMachine, {
                // 	type: EMetronomeEvent.TICK_TRIGGER,
                // }),
                // sendTo<
                // TContext extends MachineContext,
                // TExpressionEvent extends EventObject, TParams extends ParameterizedObject['params'] | undefined, TTargetActor extends AnyActorRef, TEvent extends EventObject, TDelay extends string = never, TUsedDelay extends TDelay = never>(to: TTargetActor | string | ((args: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams) => TTargetActor | string), eventOrExpr: EventFrom<TTargetActor> | SendExpr<TContext, TExpressionEvent, TParams, InferEvent<Cast<EventFrom<TTargetActor>, EventObject>>, TEvent>, options?: SendToActionOptions<TContext, TExpressionEvent, TParams, DoNotInfer<TEvent>, TUsedDelay>): ActionFunction<TContext, TExpressionEvent, TEvent, TParams, never, never, never, TDelay, never>;
                sendTo(function (_a) {
                    var context = _a.context;
                    return context.metronomeStateMachine;
                }, {
                    type: EMetronomeEvent.TICK_TRIGGER,
                }),
            ],
        },
        _a[ETimerStateMachineEventType.SET_TEMPO] = {
            actions: [
                assign({
                    tempo: function (_a) {
                        var event = _a.event;
                        return event.tempo;
                    },
                }),
                sendTo(INTERVAL_ACTOR_ID, function (_a) {
                    var event = _a.event;
                    return {
                        type: EIntervalActorEventType.SET_TEMPO,
                        newTempo: event.tempo,
                    };
                }),
            ],
        },
        _a),
    invoke: [intervalCallbackActorConfig],
};
