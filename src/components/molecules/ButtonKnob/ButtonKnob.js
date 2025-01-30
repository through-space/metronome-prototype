var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Knob } from "react-rotary-knob";
import { ButtonKnobInnerButtonWrapper, ButtonKnobWrapper, } from "@components/molecules/ButtonKnob/ButtonKnobStyledComponents";
import { useLongPress } from "use-long-press";
import { getAdjustedNewKnobValue, getKnobChangeValue, KNOB_STEP, LONG_CLICK_THRESHOLD, MAX_KNOB_VALUE, MIN_KNOB_VALUE, } from "@components/molecules/ButtonKnob/ButtonKnobConsts";
import { MetronomeStateMachineContext } from "@context/MetronomeMachineContext/MetronomeMachineContext";
import { EMetronomeEvent } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
export var ButtonKnob = function () {
    var metronomeMachineRef = MetronomeStateMachineContext.useActorRef();
    var _a = useState(0), knobValue = _a[0], setKnobValue = _a[1];
    var longPress = useLongPress(function () {
        metronomeMachineRef.send({ type: EMetronomeEvent.KNOB_LONG_CLICK });
    }, {
        threshold: LONG_CLICK_THRESHOLD,
    });
    var handleKnobTurn = function (newKnobValue) {
        var change = getKnobChangeValue(knobValue, newKnobValue);
        if (Math.abs(newKnobValue - knobValue) < KNOB_STEP || change === 0) {
            return;
        }
        var calculatedNewKnobValue = getAdjustedNewKnobValue(newKnobValue);
        setKnobValue(calculatedNewKnobValue);
        metronomeMachineRef.send({
            type: EMetronomeEvent.KNOB_TURN,
            change: change,
        });
    };
    return (_jsxs(ButtonKnobWrapper, { children: [_jsx(Knob, { step: 1, onChange: handleKnobTurn, preciseMode: false, value: knobValue, min: MIN_KNOB_VALUE, max: MAX_KNOB_VALUE }), _jsx(ButtonKnobInnerButtonWrapper, __assign({ onClick: function () {
                    return metronomeMachineRef.send({
                        type: EMetronomeEvent.KNOB_CLICK,
                    });
                } }, longPress()))] }));
};
