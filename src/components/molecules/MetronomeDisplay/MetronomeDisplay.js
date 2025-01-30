import { jsx as _jsx } from "react/jsx-runtime";
import { SegmentsDisplay } from "@components/atoms/SegmentsDisplay/SegmentsDisplay";
import { useSelector } from "@xstate/react";
import { selectDisplayState } from "@services/MetronomeStateMachine/selectors/metronomeMachineSelectors";
import { MetronomeStateMachineContext } from "@context/MetronomeMachineContext/MetronomeMachineContext";
export var MetronomeDisplay = function () {
    var metronomeMachineRef = MetronomeStateMachineContext.useActorRef();
    var displayState = useSelector(metronomeMachineRef, selectDisplayState);
    return (_jsx(SegmentsDisplay, { value: displayState.text, blinkingChars: displayState.blinkingChars, blinkingDelay: displayState.blinkingDelay }));
};
