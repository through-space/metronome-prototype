var _a;
import { EStep } from "@config/commonInterfaces";
import { DEFAULT_VOLUME } from "@config/metronomeConfig";
import sound1 from "@assets/sounds/ClosedHH_808.wav";
import sound2 from "@assets/sounds/hh.wav";
var SOUND_MAP = {
    sound1: sound1,
    sound2: sound2,
};
export var DEFAULT_SOUND_FILE = "sound1";
export var DEFAULT_SOUND = SOUND_MAP[DEFAULT_SOUND_FILE];
export var CLICK_VOLUMES_MAP = (_a = {},
    _a[EStep.PAUSE] = 0,
    _a[EStep.LOW] = 0.3,
    _a[EStep.HIGH] = 0.8,
    _a);
export var getSoundVolume = function (step) {
    return step in CLICK_VOLUMES_MAP ? CLICK_VOLUMES_MAP[step] : DEFAULT_VOLUME;
};
export var getCurrentStepType = function (pattern, stepIndex) {
    return pattern === null || pattern === void 0 ? void 0 : pattern[stepIndex];
};
