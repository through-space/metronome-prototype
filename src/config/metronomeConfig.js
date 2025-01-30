import { EStep } from "@config/commonInterfaces";
export var MIN_TEMPO = 20;
export var MAX_TEMPO = 320;
export var DEFAULT_TEMPO = 60;
export var DEFAULT_VOLUME = 0;
export var E_DISPLAY_BLINKING_DELAYS;
(function (E_DISPLAY_BLINKING_DELAYS) {
    E_DISPLAY_BLINKING_DELAYS[E_DISPLAY_BLINKING_DELAYS["LONG"] = 500] = "LONG";
    E_DISPLAY_BLINKING_DELAYS[E_DISPLAY_BLINKING_DELAYS["SHORT"] = 200] = "SHORT";
})(E_DISPLAY_BLINKING_DELAYS || (E_DISPLAY_BLINKING_DELAYS = {}));
export var DEFAULT_BLINKING_DELAY = E_DISPLAY_BLINKING_DELAYS.LONG;
export var DEFAULT_PATTERN = [EStep.HIGH, EStep.LOW, EStep.LOW, EStep.LOW];
