import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MetronomeMachineContextProvider } from "@context/MetronomeMachineContext/MetronomeMachineContextProvider";
import { StartStopButton } from "@components/molecules/StartStopButton/StartStopButton";
import { MetronomeDisplay } from "@components/molecules/MetronomeDisplay/MetronomeDisplay";
import { ButtonKnob } from "@components/molecules/ButtonKnob/ButtonKnob";
import { LED } from "@components/atoms/LED/LED";
import { TickAudio } from "@components/molecules/TickAudio/TickAudio";
export var Metronome = function () {
    return (_jsx(_Fragment, { children: _jsxs(MetronomeMachineContextProvider, { children: [_jsx(MetronomeDisplay, {}), _jsx(StartStopButton, {}), _jsx(ButtonKnob, {}), _jsx(LED, { delay: 60 }), _jsx(TickAudio, {})] }) }));
};
