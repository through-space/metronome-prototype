export var selectIsPlaying = function (snapshot) {
    return snapshot.context.isPlaying;
};
export var selectDisplayState = function (snapshot) {
    return snapshot.context.display;
};
export var selectTickTrigger = function (snapshot) {
    return snapshot.context.tickTrigger;
};
export var selectCurrentStep = function (snapshot) {
    return snapshot.context.currentStep;
};
export var selectPattern = function (snapshot) {
    return snapshot.context.pattern;
};
