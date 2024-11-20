import { ILEDProps } from "@components/atoms/LED/LEDInterfaces";
import { LEDStyledComponent } from "@components/atoms/LED/LEDStyledComponents";
import { useEffect, useState } from "react";

export const LED = (props: ILEDProps) => {
	const { trigger, delay } = props;
	const [isOn, setIsOn] = useState(false);

	useEffect(() => {
		setIsOn(true);
		setTimeout(() => setIsOn(false), delay);
	}, [trigger]);

	return <LEDStyledComponent $isOn={isOn} />;
};
