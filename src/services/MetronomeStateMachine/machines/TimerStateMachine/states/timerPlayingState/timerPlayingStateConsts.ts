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
import { fromCallback } from "xstate";
import {
	InvokeConfig,
	ProvidedActor,
} from "xstate/dist/declarations/src/types";

const DEFAULT_TIME_INTERVAL = 1000;
const RESET_DEBOUNCE_INTERVAL_DELAY = 200;

const getTimerIntervalDelay = (tempo: number): number => {
	if (tempo <= 0) {
		return DEFAULT_TIME_INTERVAL;
	}

	return (60 * 1000) / tempo;
};

export const getTickInterval = (props: ITickIntervalProps): NodeJS.Timeout => {
	const { tempo, sendBack } = props;

	const delay = getTimerIntervalDelay(tempo);

	sendBack({ type: ETimerStateMachineEventType.TICK });

	return setInterval(() => {
		sendBack({ type: ETimerStateMachineEventType.TICK });
	}, delay);
};

export const INTERVAL_ACTOR_ID = "intervalActor";

const debounceWithReturn = <T extends (...args: any[]) => any>(
	func: T,
	delay: number,
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
	let timeout: NodeJS.Timeout | null = null;

	return (...args: Parameters<T>) => {
		return new Promise<ReturnType<T>>((resolve) => {
			if (timeout) {
				clearTimeout(timeout);
			}
			timeout = setTimeout(() => {
				const result = func(...args);
				resolve(result);
			}, delay);
		});
	};
};

const getResetInterval = (props: {
	tickInterval: NodeJS.Timeout;
	sendBack: (event: TTimerStateMachineEvent) => void;
	tempo: number;
}): NodeJS.Timeout => {
	const { tickInterval, sendBack, tempo } = props;
	console.log("new tempo in reset", tempo);
	clearInterval(tickInterval);
	return getTickInterval({ sendBack, tempo });
};

const getDebouncedResetInterval = (props: {
	sendBack: (event: TTimerStateMachineEvent) => void;
}): ((props: {
	tickInterval: NodeJS.Timeout;
	tempo: number;
}) => Promise<NodeJS.Timeout>) => {
	const { sendBack } = props;

	return debounceWithReturn<
		(props: {
			tickInterval: NodeJS.Timeout;
			tempo: number;
		}) => NodeJS.Timeout
	>(
		({ tickInterval, tempo }) =>
			getResetInterval({ tickInterval, sendBack, tempo }),
		RESET_DEBOUNCE_INTERVAL_DELAY,
	);
};

export const intervalCallbackActorConfig: InvokeConfig<
	ITimerStateMachineContext,
	TTimerStateMachineEvent,
	ProvidedActor,
	never,
	never,
	never,
	never,
	never
> = {
	id: INTERVAL_ACTOR_ID,
	src: fromCallback(({ input: { tempo }, sendBack, receive }) => {
		console.log("invoked timerCallbackActor", tempo);

		let tickInterval = getTickInterval({ sendBack, tempo });

		const debouncedGetResetInterval = getDebouncedResetInterval({
			sendBack,
		});

		const updateTempo = (tempo: number) => {
			debouncedGetResetInterval({ tickInterval, tempo }).then(
				(updatedInterval: NodeJS.Timeout) => {
					tickInterval = updatedInterval;
				},
			);
		};

		receive((event: TIntervalActorEvent) => {
			if (event.type === EIntervalActorEventType.SET_TEMPO) {
				console.log(
					"Received EIntervalActorEventType.SET_TEMPO",
					event,
				);

				updateTempo(event.newTempo);
			}
		});

		return () => {
			console.log("cleared interval");
			clearInterval(tickInterval);
		};
	}),
	input: ({ context: { tempo } }) => {
		return { tempo };
	},
};
