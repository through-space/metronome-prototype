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
import { assign } from "xstate";
import { EMetronomeEvent, EStateMachineState, } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { getAllStateOptions, getNextStateOptionIndex, getStateMenuDisplay, } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/stateMenuState/stateMenuStateConsts";
import { E_DISPLAY_BLINKING_DELAYS } from "@config/metronomeConfig";
export var stateMenuState = {
    id: EStateMachineState.stateMenuState,
    on: (_a = {},
        _a[EMetronomeEvent.KNOB_TURN] = {
            actions: assign(function (_a) {
                var context = _a.context, change = _a.event.change;
                var allStates = getAllStateOptions();
                var nextStateIndex = getNextStateOptionIndex({
                    turnValue: change,
                    currentMenuOptionIndex: context.currentMenuOptionIndex,
                    allStates: allStates,
                    lastState: context.lastState,
                });
                var nextStateName = allStates[nextStateIndex];
                return {
                    display: __assign(__assign({}, context.display), { text: getStateMenuDisplay(nextStateName, context).value }),
                    currentMenuOptionIndex: nextStateIndex,
                    currentStateOption: nextStateName,
                };
            }),
        },
        _a[EMetronomeEvent.KNOB_CLICK] = [
            {
                guard: function (_a) {
                    var currentStateOption = _a.context.currentStateOption;
                    return currentStateOption === "tempoState";
                },
                target: "tempoState",
            },
            {
                guard: function (_a) {
                    var currentStateOption = _a.context.currentStateOption;
                    return currentStateOption === "patternState";
                },
                target: "patternState",
            },
        ],
        _a),
    exit: assign(function (_a) {
        var context = _a.context;
        return {
            currentStateOption: "",
            currentMenuOptionIndex: undefined,
            display: __assign(__assign({}, context.display), { blinkingChars: [] }),
        };
    }),
    entry: [
        assign(function (_a) {
            var display = _a.context.display;
            return {
                display: __assign(__assign({}, display), { blinkingChars: [0, 1, 2, 3], blinkingDelay: E_DISPLAY_BLINKING_DELAYS.LONG }),
            };
        }),
    ],
};
