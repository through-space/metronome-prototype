import { getPatternDisplay } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/patternStateConsts";
import { getTempoDisplay } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/tempoState/tempoStateConsts";
var DEFAULT_EMPTY_DISPLAY = { value: "" };
var stateMenuOptionsDisplayMap = new Map([
    ["tempoState", function (_a) {
            var context = _a.context;
            return getTempoDisplay({ context: context });
        }],
    ["patternState", function (_a) {
            var context = _a.context;
            return getPatternDisplay({ context: context });
        }],
]);
export var getStateMenuDisplay = function (stateName, context) {
    if (!stateMenuOptionsDisplayMap.has(stateName)) {
        return DEFAULT_EMPTY_DISPLAY;
    }
    var getDisplay = stateMenuOptionsDisplayMap.get(stateName);
    if (!getDisplay) {
        return { value: "" };
    }
    return getDisplay({ context: context });
};
export var getAllStateOptions = function () {
    return Array.from(stateMenuOptionsDisplayMap.keys());
};
export var getNextStateOptionIndex = function (_a) {
    var currentMenuOptionIndex = _a.currentMenuOptionIndex, allStates = _a.allStates, lastState = _a.lastState, turnValue = _a.turnValue;
    var currentStateIndex = currentMenuOptionIndex === undefined
        ? allStates.indexOf(lastState)
        : currentMenuOptionIndex;
    return Math.abs(currentStateIndex + turnValue) % allStates.length;
};
