var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { setup } from "xstate";
import { ETimerMachineState, } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
import { DEFAULT_TIMER_CONTEXT } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineConsts";
import { idleState } from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerIdleState/timerIdleState";
import { playingState } from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingState";
export var TimerStateMachine = setup({}).createMachine({
    initial: ETimerMachineState.idleState,
    context: function (_a) {
        var input = _a.input;
        return (__assign(__assign({}, DEFAULT_TIMER_CONTEXT), input));
    },
    states: { idleState: idleState, playingState: playingState },
});
