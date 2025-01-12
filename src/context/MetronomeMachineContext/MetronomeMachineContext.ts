import { createActorContext } from "@xstate/react";
import { MetronomeStateMachine } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachine";

export const MetronomeStateMachineContext = createActorContext(
	MetronomeStateMachine,
);
