import { jsx as _jsx } from "react/jsx-runtime";
import { LEDStyledComponent } from "@components/atoms/LED/LEDStyledComponents";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "@xstate/react";
import { MetronomeStateMachineContext } from "../../../context/MetronomeMachineContext/MetronomeMachineContext";
import { selectTickTrigger } from "@services/MetronomeStateMachine/selectors/metronomeMachineSelectors";
export var LED = function (props) {
    var delay = props.delay;
    var _a = useState(false), isOn = _a[0], setIsOn = _a[1];
    var isFirstRender = useRef(true);
    var metronomeMachineRef = MetronomeStateMachineContext.useActorRef();
    var trigger = useSelector(metronomeMachineRef, selectTickTrigger);
    useEffect(function () {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setIsOn(true);
        setTimeout(function () { return setIsOn(false); }, delay);
    }, [trigger, delay]);
    return _jsx(LEDStyledComponent, { "$isOn": isOn });
};
