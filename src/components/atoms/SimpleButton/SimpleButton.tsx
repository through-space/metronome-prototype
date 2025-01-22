import { IStartStopButtonProps } from "@components/atoms/SimpleButton/SimpleButtonInterfaces";
import { StartStopButtonStyled } from "@components/atoms/SimpleButton/SimpleButtonStyledComponents";

export const SimpleButton = ({ children, onClick }: IStartStopButtonProps) => {
	return (
		<StartStopButtonStyled onClick={onClick}>
			{children}
		</StartStopButtonStyled>
	);
};
