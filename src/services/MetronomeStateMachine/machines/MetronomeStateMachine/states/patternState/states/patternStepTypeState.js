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
import { getNextStep } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/states/patternSubstatesConsts";
import { E_DISPLAY_BLINKING_DELAYS } from "@config/metronomeConfig";
export var patternStepTypeState = {
    id: "patternStepTypeState",
    on: (_a = {},
        _a[EMetronomeEvent.KNOB_CLICK] = {
            target: "#patternChooseStepState",
        },
        _a[EMetronomeEvent.KNOB_TURN] = {
            actions: [
                assign(function (_a) {
                    var context = _a.context, event = _a.event;
                    var curStepType = context.pattern[context.currentEditCharIndex];
                    var nextStepType = getNextStep(curStepType, event);
                    var newPattern = context.pattern;
                    newPattern[context.currentEditCharIndex] = nextStepType;
                    return __assign(__assign({}, context), { 
                        // pattern: newPattern,
                        display: __assign(__assign({}, context.display), { text: getPatternDisplay({ context: context }).value }) });
                    // const newEditCharIndex = getNewCharIndex(context, event);
                    //
                    // return {
                    // 	...context,
                    // 	currentEditCharIndex: newEditCharIndex,
                    // 	display: {
                    // 		...context.display,
                    // 		blinkingChars: [newEditCharIndex],
                    // 	},
                    // };
                }),
            ],
        },
        _a),
    states: {},
    entry: assign(function (_a) {
        var context = _a.context;
        return __assign(__assign({}, context), { display: __assign(__assign({}, context.display), { blinkingDelay: E_DISPLAY_BLINKING_DELAYS.SHORT }) });
    }),
};
