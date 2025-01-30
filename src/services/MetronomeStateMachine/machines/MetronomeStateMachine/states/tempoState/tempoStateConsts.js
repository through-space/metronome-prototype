import { MAX_TEMPO, MIN_TEMPO } from "@config/metronomeConfig";
export var getUpdatedTempo = function (tempo, tempoChange) {
    var newTempo = tempo + tempoChange;
    if (newTempo > MAX_TEMPO) {
        return MAX_TEMPO;
    }
    else if (newTempo < MIN_TEMPO) {
        return MIN_TEMPO;
    }
    else {
        return newTempo;
    }
};
export var getTempoDisplay = function (_a) {
    var context = _a.context;
    if (!context) {
        return { value: "" };
    }
    return {
        value: context.tempo.toString(),
    };
};
