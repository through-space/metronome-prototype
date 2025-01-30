import { DEFAULT_TEMPO, E_DISPLAY_BLINKING_DELAYS, } from "@config/metronomeConfig";
import { EStep } from "@config/commonInterfaces";
export var INIT_METRONOME_STATE = {
    tempo: DEFAULT_TEMPO,
    pattern: [EStep.HIGH, EStep.LOW, EStep.LOW, EStep.LOW],
    isPlaying: false,
    lastState: "tempoState",
    currentStep: -1,
    tickTrigger: false,
    display: {
        text: DEFAULT_TEMPO.toString(),
        blinkingChars: [],
        blinkingDelay: E_DISPLAY_BLINKING_DELAYS.LONG,
    },
};
export var SINGLE_TIMER_MACHINE_ID = "SINGLE_TIMER_MACHINE_ID";
