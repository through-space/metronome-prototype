import { ActorLogic, Snapshot } from "xstate";
import {
	ITimerStateMachineContext,
	TTimerStateMachineEvent,
} from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";

export interface ITimerStateMachineActorLogic
	extends ActorLogic<
		Snapshot<ITimerStateMachineContext>,
		TTimerStateMachineEvent
	> {}
