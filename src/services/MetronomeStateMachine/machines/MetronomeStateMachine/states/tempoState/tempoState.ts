import { assign, enqueueActions, StateNodeConfig } from "xstate";
import {
	EMetronomeEvent,
	IKnobTurnEvent,
	IMetronomeContext,
	IMetronomeStateMachineActorLogic,
	TMetronomeAction,
	TMetronomeActorLogic,
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
	type PropertyAssigner,
} from "xstate/dist/declarations/src/types";
import { ITimerStateMachineActorLogic } from "@services/MetronomeStateMachine/actors/TimerStateMachineActor/TimerStateMachineActor";
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
	// TMetronomeEvent,
	// {
	// 	src: string;
	// 	logic: TMetronomeActorLogic;
	// 	id: string;
	// },
	//

	TMetronomeEvent,
	{
		src: string;
		logic: IMetronomeStateMachineActorLogic;
		id: string;
	},
	// any,
	TMetronomeAction,
	// any,
	// { type: EMetronomeEvent; params: TMetronomeEvent },
	// IKnobTurnEvent,
	any,
	any,
	any,
	// any,
	any,
	any,
	// {} extends EventObject,
	// IKnobTurnEvent,
	any
	// any
	// any
	// string,
	// string,
	// never,
	// EventObject,
	// MetaObject
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
					if (!timerStateMachineRef) {
						return;
					}

					const newTempo = getUpdatedTempo(tempo, change);

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
