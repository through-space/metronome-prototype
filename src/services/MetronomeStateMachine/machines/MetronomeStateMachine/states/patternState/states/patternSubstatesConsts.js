import { stepTypes } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/patternStateConsts";
export var getNewCharIndex = function (context, event) {
    return Math.abs((context.currentEditCharIndex + event.change) % context.pattern.length);
};
export var getNextStep = function (stepType, event) {
    var stepTypeIndex = stepTypes.indexOf(stepType);
    return stepTypes[(stepTypeIndex + event.change) % stepTypes.length];
};
