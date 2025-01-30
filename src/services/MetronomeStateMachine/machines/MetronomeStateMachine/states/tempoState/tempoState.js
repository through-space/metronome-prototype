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
var _a;
import { assign, enqueueActions } from "xstate";
import { EMetronomeEvent, } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { getTempoDisplay, getUpdatedTempo, } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/tempoState/tempoStateConsts";
import { ETimerStateMachineEventType } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
// <TContext extends MachineContext,
// 	TEvent extends EventObject,
// 	TActor extends ProvidedActor,
// 	TAction extends ParameterizedObject,
// 	TGuard extends ParameterizedObject,
// 	TDelay extends string,
// 	TTag extends string,
// 	_TOutput,
// 	TEmitted extends EventObject, TMeta extends MetaObject>
export var tempoState = {
    // id: EStateMachineState.tempoState,
    // initial: {},
    on: (_a = {},
        _a[EMetronomeEvent.KNOB_TURN] = {
            actions: enqueueActions(function (_a) {
                var _b = _a.context, tempo = _b.tempo, display = _b.display, timerStateMachineRef = _b.timerStateMachineRef, change = _a.event.change, enqueue = _a.enqueue;
                if (!timerStateMachineRef) {
                    return;
                }
                var newTempo = getUpdatedTempo(tempo, change);
                enqueue.assign({ tempo: newTempo });
                enqueue.assign({
                    display: __assign(__assign({}, display), { text: newTempo.toString() }),
                });
                enqueue.sendTo(timerStateMachineRef, {
                    type: ETimerStateMachineEventType.SET_TEMPO,
                    tempo: newTempo,
                });
            }),
        },
        _a[EMetronomeEvent.KNOB_CLICK] = {},
        _a[EMetronomeEvent.KNOB_LONG_CLICK] = {
            target: "stateMenuState",
            actions: [{ type: "ON_OPEN_STATE_MENU" }],
        },
        _a),
    entry: assign(function (_a) {
        var context = _a.context;
        return __assign(__assign({}, context), { display: __assign(__assign({}, context.display), { text: getTempoDisplay({ context: context }).value, blinkingChars: [] }) });
    }),
};
