import { createActorContext } from "@xstate/react";
import { MetronomeStateMachine } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachine";
export var MetronomeStateMachineContext = createActorContext(MetronomeStateMachine);
