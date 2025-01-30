import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from "react";
import { SoundPlayer } from "@components/atoms/SoundPlayer/SoundPlayer";
import { DEFAULT_SOUND, getCurrentStepType, getSoundVolume, } from "@components/molecules/TickAudio/TickAudioConsts";
import { MetronomeStateMachineContext } from "@context/MetronomeMachineContext/MetronomeMachineContext";
import { useSelector } from "@xstate/react";
import { selectCurrentStep, selectPattern, } from "@services/MetronomeStateMachine/selectors/metronomeMachineSelectors";
export var TickAudio = function () {
    var metronomeMachineRef = MetronomeStateMachineContext.useActorRef();
    var currentStepIndex = useSelector(metronomeMachineRef, selectCurrentStep);
    var pattern = useSelector(metronomeMachineRef, selectPattern);
    var getAudioFile = useCallback(function () {
        return DEFAULT_SOUND;
    }, []);
    var getVolume = useCallback(function () {
        return getSoundVolume(getCurrentStepType(pattern, currentStepIndex));
    }, [currentStepIndex, pattern]);
    return (_jsx(SoundPlayer, { getAudioFile: getAudioFile, getVolume: getVolume, trigger: currentStepIndex }));
};
