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
import { EMetronomeEvent, } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { getPatternDisplay } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/patternStateConsts";
import { assign } from "xstate";
import { getNewCharIndex } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/states/patternSubstatesConsts";
import { E_DISPLAY_BLINKING_DELAYS } from "@config/metronomeConfig";
export var patternChooseStepState = {
    id: "patternChooseStepState",
    on: (_a = {},
        _a[EMetronomeEvent.KNOB_CLICK] = {
            target: "#patternStepTypeState",
        },
        _a[EMetronomeEvent.KNOB_TURN] = {
            actions: [
                assign(function (_a) {
                    var context = _a.context, event = _a.event;
                    var newEditCharIndex = getNewCharIndex(context, event);
                    return __assign(__assign({}, context), { currentEditCharIndex: newEditCharIndex, display: __assign(__assign({}, context.display), { blinkingChars: [newEditCharIndex] }) });
                }),
            ],
        },
        _a),
    states: {},
    entry: assign(function (_a) {
        var context = _a.context;
        return {
            display: __assign(__assign({}, context.display), { blinkingChars: [context.currentEditCharIndex], blinkingDelay: E_DISPLAY_BLINKING_DELAYS.LONG, text: getPatternDisplay({ context: context }).value }),
        };
    }),
};
