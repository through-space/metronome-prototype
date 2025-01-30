var _a;
import { assign } from "xstate";
import { ETimerMachineState, ETimerStateMachineEventType, } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
export var idleState = {
    on: (_a = {},
        _a[ETimerStateMachineEventType.START] = ETimerMachineState.playingState,
        _a[ETimerStateMachineEventType.SET_TEMPO] = {
            actions: [
                assign({
                    tempo: function (_a) {
                        var event = _a.event;
                        return event.tempo;
                    },
                }),
            ],
        },
        _a),
};
