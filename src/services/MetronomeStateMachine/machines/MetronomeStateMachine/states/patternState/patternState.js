var _a;
import { assign } from "xstate";
import { EMetronomeEvent, EStateMachineState, } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { patternChooseStepState } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/states/patternChooseStepState";
import { patternStepTypeState } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/states/patternStepTypeState";
export var patternState = {
    id: EStateMachineState.patternState,
    initial: "patternChooseStepState",
    on: (_a = {},
        //TODO: move this to MetronomeStateMachine from here and other states
        _a[EMetronomeEvent.KNOB_LONG_CLICK] = {
            target: EStateMachineState.stateMenuState,
            actions: [{ type: "ON_OPEN_STATE_MENU" }],
        },
        _a),
    states: {
        patternChooseStepState: patternChooseStepState,
        patternStepTypeState: patternStepTypeState,
    },
    entry: assign(function (_a) {
        var context = _a.context;
        if (context.currentEditCharIndex === undefined) {
            return {
                currentEditCharIndex: 0,
            };
        }
        return {};
    }),
};
