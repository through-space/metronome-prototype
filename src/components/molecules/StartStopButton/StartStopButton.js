import { jsx as _jsx } from "react/jsx-runtime";
import { SimpleButton } from "@components/atoms/SimpleButton/SimpleButton";
import { MetronomeStateMachineContext } from "../../../context/MetronomeMachineContext/MetronomeMachineContext";
import { EMetronomeEvent } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { useSelector } from "@xstate/react";
import { selectIsPlaying } from "@services/MetronomeStateMachine/selectors/metronomeMachineSelectors";
export var StartStopButton = function () {
    var metronomeMachineRef = MetronomeStateMachineContext.useActorRef();
    var isPlaying = useSelector(metronomeMachineRef, selectIsPlaying);
    return (_jsx(SimpleButton, { onClick: function () {
            return metronomeMachineRef.send({
                type: EMetronomeEvent.START_STOP_CLICK,
            });
        }, children: isPlaying ? "Stop" : "Start" }));
};
