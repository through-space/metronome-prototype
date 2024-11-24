import {
	assign,
	EventObject,
	MetaObject,
	StateNodeConfig,
	TransitionConfigOrTarget,
} from "xstate";
import {
	IMetronomeContext,
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";

// interface IStateMenuStateContext extends IMetronomeContext {
// 	currentMenuState: TransitionConfigOrTarget<
// 		any,
// 		any,
// 		any,
// 		any,
// 		any,
// 		any,
// 		any,
// 		any,
// 		any
// 	>;
// }

const getMenuDisplayText: { [state: string]: () => string } = {
	tempoState: () => {
		return "a";
	},
	tempoState2test: () => {
		return "b";
	},
};
// 	: () => {}
// 	"tempoState2test",
//
// }

export const stateMenuState: StateNodeConfig<
	IMetronomeContext,
	TMetronomeEvent,
	never,
	never,
	never,
	never,
	string,
	{},
	EventObject,
	MetaObject
> = {
	// entry: ({ curState }) => {
	// 	console.log("stateMenuState:1111", curState);
	// },
	on: {
		"knob.turn": {
			actions: assign(({ context, event, self }) => {
				const allStates = Object.keys(getMenuDisplayText);
				const currentState =
					context.lastState ?? self.getSnapshot().value.toString();
				const currentStateIndex = allStates.indexOf(
					currentState.toString(),
				);

				// if (currentStateIndex === -1) {
				// 	return {};
				// }

				const nextStateIndex =
					(currentStateIndex + event.value) % allStates.length;

				console.log(`currentStateIndex: ${currentStateIndex}`);
				return {
					displayText: nextStateIndex.toString(),
				};
			}),
		},
	},
};
