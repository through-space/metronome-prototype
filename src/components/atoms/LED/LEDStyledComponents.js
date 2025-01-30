var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from "styled-components";
export var LEDStyledComponent = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\twidth: 50px;\n\theight: 50px;\n\tborder-radius: 50%;\n\tbackground-color: ", ";\n\tmargin: \"20px auto\";\n"], ["\n\twidth: 50px;\n\theight: 50px;\n\tborder-radius: 50%;\n\tbackground-color: ", ";\n\tmargin: \"20px auto\";\n"])), function (props) { return (props.$isOn ? "red" : "grey"); });
var templateObject_1;
