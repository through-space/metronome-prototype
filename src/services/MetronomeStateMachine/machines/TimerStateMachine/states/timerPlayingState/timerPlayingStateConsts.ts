import {
	ETimerStateMachineEventType,
	ITimerStateMachineContext,
	TTimerStateMachineEvent,
} from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
import {
	EIntervalActorEventType,
	ITickIntervalProps,
	TIntervalActorEvent,
} from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingStateInterfaces";
import { CallbackActorLogic, fromCallback } from "xstate";
import {
	InvokeConfig,
	ProvidedActor,
} from "xstate/dist/declarations/src/types";

const DEFAULT_TIME_INTERVAL = 1000;

const getTimerIntervalDelay = (tempo: number): number => {
	if (tempo <= 0) {
		return DEFAULT_TIME_INTERVAL;
	}

	return (60 * 1000) / tempo;
};

export const getTickInterval = (props: ITickIntervalProps) => {
	const { tempo, sendBack } = props;

	const delay = getTimerIntervalDelay(tempo);

	sendBack({ type: ETimerStateMachineEventType.TICK });
	return setInterval(() => {
		sendBack({ type: ETimerStateMachineEventType.TICK });
	}, delay);
};

export const INTERVAL_ACTOR_ID = "intervalActor";

export const intervalCallbackActorConfig: InvokeConfig<
	ITimerStateMachineContext,
	TTimerStateMachineEvent,
	ProvidedActor,
	never,
	never,
	never,
	never,
	never
	// any,
	// any,
	// any,
	// any
> = {
	id: INTERVAL_ACTOR_ID,
	src: fromCallback(({ input: { tempo }, sendBack, receive }) => {
		console.log("invoked timerCallbackActor", tempo);

		const interval = getTickInterval({ sendBack, tempo });

		let test = 0;

		receive((event: TIntervalActorEvent) => {
			if (event.type === EIntervalActorEventType.RESTART) {
				console.log("Received EIntervalActorEventType.RESTART");
				test++;
				console.log("test", test);
			}
		});

		return () => {
			clearInterval(interval);
		};
	}),
	input: ({ context: { tempo } }) => {
		return { tempo };
	},
};
