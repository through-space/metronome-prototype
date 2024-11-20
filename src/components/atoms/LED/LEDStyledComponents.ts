import styled from "styled-components";

export const LEDStyledComponent = styled.div<{
	$isOn?: boolean;
}>`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: ${(props) => (props.$isOn ? "red" : "grey")};
	margin: "20px auto";
`;
