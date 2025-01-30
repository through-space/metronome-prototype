import { ETimerStateMachineEventType, } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
import { EIntervalActorEventType, } from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingStateInterfaces";
import { fromCallback } from "xstate";
var DEFAULT_TIME_INTERVAL = 1000;
var RESET_DEBOUNCE_INTERVAL_DELAY = 200;
var getTimerIntervalDelay = function (tempo) {
    if (tempo <= 0) {
        return DEFAULT_TIME_INTERVAL;
    }
    return (60 * 1000) / tempo;
};
export var getTickInterval = function (props) {
    var tempo = props.tempo, sendBack = props.sendBack;
    var delay = getTimerIntervalDelay(tempo);
    sendBack({ type: ETimerStateMachineEventType.TICK });
    return setInterval(function () {
        sendBack({ type: ETimerStateMachineEventType.TICK });
    }, delay);
};
export var INTERVAL_ACTOR_ID = "intervalActor";
var debounceWithReturn = function (func, delay) {
    var timeout = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve) {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                var result = func.apply(void 0, args);
                resolve(result);
            }, delay);
        });
    };
};
var getResetInterval = function (props) {
    var tickInterval = props.tickInterval, sendBack = props.sendBack, tempo = props.tempo;
    clearInterval(tickInterval);
    return getTickInterval({ sendBack: sendBack, tempo: tempo });
};
var getDebouncedResetInterval = function (props) {
    var sendBack = props.sendBack;
    return debounceWithReturn(function (_a) {
        var tickInterval = _a.tickInterval, tempo = _a.tempo;
        return getResetInterval({ tickInterval: tickInterval, sendBack: sendBack, tempo: tempo });
    }, RESET_DEBOUNCE_INTERVAL_DELAY);
};
export var intervalCallbackActorConfig = {
    id: INTERVAL_ACTOR_ID,
    src: fromCallback(function (_a) {
        var tempo = _a.input.tempo, sendBack = _a.sendBack, receive = _a.receive;
        var tickInterval = getTickInterval({ sendBack: sendBack, tempo: tempo });
        var debouncedGetResetInterval = getDebouncedResetInterval({
            sendBack: sendBack,
        });
        var updateTempo = function (tempo) {
            debouncedGetResetInterval({ tickInterval: tickInterval, tempo: tempo }).then(function (updatedInterval) {
                tickInterval = updatedInterval;
            });
        };
        receive(function (event) {
            if (event.type === EIntervalActorEventType.SET_TEMPO) {
                updateTempo(event.newTempo);
            }
        });
        return function () {
            clearInterval(tickInterval);
        };
    }),
    input: function (_a) {
        var tempo = _a.context.tempo;
        return { tempo: tempo };
    },
};
