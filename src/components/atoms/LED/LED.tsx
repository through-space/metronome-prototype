import { LEDStyledComponent } from "@components/atoms/LED/LEDStyledComponents";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "@xstate/react";
import { MetronomeStateMachineContext } from "@context/MetronomeMachineContext/MetronomeMachineContext";
import { selectTickTrigger } from "@services/MetronomeStateMachine/selectors/metronomeMachineSelectors";
import { DEFAULT_LED_DELAY } from "@components/atoms/LED/LEDConst";

export const LED = () => {
	const [isOn, setIsOn] = useState(false);
	const isFirstRender = useRef<boolean>(true);
	const delay = DEFAULT_LED_DELAY;

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
