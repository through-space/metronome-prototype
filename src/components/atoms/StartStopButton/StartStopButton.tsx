import { IStartStopButtonProps } from "@components/atoms/StartStopButton/StartStopButtonInterfaces";
import { StartStopButtonStyled } from "@components/atoms/StartStopButton/StartStopButtonStyledComponents";

export const StartStopButton = ({
	children,
	onClick,
}: IStartStopButtonProps) => {
	return (
		<StartStopButtonStyled onClick={onClick}>
			{children}
		</StartStopButtonStyled>
	);
};
