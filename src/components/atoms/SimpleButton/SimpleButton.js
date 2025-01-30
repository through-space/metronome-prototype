import { jsx as _jsx } from "react/jsx-runtime";
import { StartStopButtonStyled } from "@components/atoms/SimpleButton/SimpleButtonStyledComponents";
export var SimpleButton = function (_a) {
    var children = _a.children, onClick = _a.onClick;
    return (_jsx(StartStopButtonStyled, { onClick: onClick, children: children }));
};
