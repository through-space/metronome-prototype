import { assign, enqueueActions, StateNodeConfig } from "xstate";
import {
	EMetronomeEvent,
	IMetronomeContext,
	IMetronomeStateMachineActorLogic,
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import {
	getTempoDisplay,
	getUpdatedTempo,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/tempoState/tempoStateConsts";
import { ETimerStateMachineEventType } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
import {
	ActorRefFromLogic,
	EventObject,
	MetaObject,
} from "xstate/dist/declarations/src/types";
import { TimerStateMachine } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachine";

// <TContext extends MachineContext,
// 	TEvent extends EventObject,
// 	TActor extends ProvidedActor,
// 	TAction extends ParameterizedObject,
// 	TGuard extends ParameterizedObject,
// 	TDelay extends string,
// 	TTag extends string,
// 	_TOutput,
// 	TEmitted extends EventObject, TMeta extends MetaObject>
export const tempoState: StateNodeConfig<
	IMetronomeContext,
	TMetronomeEvent,
	{
		src: string;
		logic: IMetronomeStateMachineActorLogic;
		id: string;
	},
	TMetronomeAction,
	// any,
	// { type: string; params?: NonReducibleUnknown },
	{ type: EMetronomeEvent; params: TMetronomeEvent },
	string,
	string,
	any,
	EventObject,
	MetaObject
> = {
	// id: EStateMachineState.tempoState,
	// initial: {},
	on: {
		[EMetronomeEvent.KNOB_TURN]: {
			actions: enqueueActions(
				({
					context: { tempo, display, timerStateMachineRef },
					event: { change },
					enqueue,
				}) => {
					const newTempo = getUpdatedTempo(tempo, change);

					if (!timerStateMachineRef) {
						return;
					}

					enqueue.assign({ tempo: newTempo });
					enqueue.assign({
						display: { ...display, text: newTempo.toString() },
					});
					enqueue.sendTo<ActorRefFromLogic<typeof TimerStateMachine>>(
						timerStateMachineRef,
						{
							type: ETimerStateMachineEventType.SET_TEMPO,
							tempo: newTempo,
						},
					);
				},
			),
		},
		[EMetronomeEvent.KNOB_CLICK]: {},
		[EMetronomeEvent.KNOB_LONG_CLICK]: {
			target: "stateMenuState",
			actions: [{ type: "ON_OPEN_STATE_MENU" }],
		},
	},
	entry: assign(({ context }) => {
		return {
			...context,
			display: {
				...context.display,
				text: getTempoDisplay({ context }).value,
				blinkingChars: [],
			},
		};
	}),
};
