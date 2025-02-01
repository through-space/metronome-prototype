import { MetronomeMachineContextProvider } from "@context/MetronomeMachineContext/MetronomeMachineContextProvider";
import { StartStopButton } from "@components/molecules/StartStopButton/StartStopButton";
import { MetronomeDisplay } from "@components/molecules/MetronomeDisplay/MetronomeDisplay";
import { ButtonKnob } from "@components/molecules/ButtonKnob/ButtonKnob";
import { LED } from "@components/atoms/LED/LED";
import { TickAudio } from "@components/molecules/TickAudio/TickAudio";

export const Metronome = () => {
	return (
		<>
			<MetronomeMachineContextProvider>
				<MetronomeDisplay />
				<StartStopButton />
				<ButtonKnob />
				<LED />
				<TickAudio />
			</MetronomeMachineContextProvider>
		</>
	);
};
