import styled from "styled-components";

export const ButtonKnobWrapper = styled.div`
	height: 70px;
	width: 70px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ButtonKnobInnerButtonWrapper = styled.button`
	width: 20%;
	height: 20%;
	position: absolute;
	border-radius: 50%;
	padding: 0;
	&:focus {
		outline: none;
	}
`;
