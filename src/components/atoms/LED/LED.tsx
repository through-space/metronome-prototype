import { ILEDProps } from "@components/atoms/LED/LEDInterfaces";
import { LEDStyledComponent } from "@components/atoms/LED/LEDStyledComponents";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "@xstate/react";
import { MetronomeStateMachineContext } from "../../../context/MetronomeMachineContext/MetronomeMachineContext";
import { selectTickTrigger } from "@services/MetronomeStateMachine/selectors/metronomeMachineSelectors";

export const LED = (props: ILEDProps) => {
	const { delay } = props;
	const [isOn, setIsOn] = useState(false);
	const isFirstRender = useRef<boolean>(true);

	const metronomeMachineRef = MetronomeStateMachineContext.useActorRef();
	const trigger = useSelector(metronomeMachineRef, selectTickTrigger);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		setIsOn(true);
		setTimeout(() => setIsOn(false), delay);
	}, [trigger, delay]);

	return <LEDStyledComponent $isOn={isOn} />;
};
