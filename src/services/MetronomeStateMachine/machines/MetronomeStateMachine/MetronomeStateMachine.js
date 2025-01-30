var _a;
import { assign, sendTo, setup } from "xstate";
import { INIT_METRONOME_STATE, SINGLE_TIMER_MACHINE_ID, } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineConsts";
import { EMetronomeEvent, EStateMachineState, } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { TimerStateMachine } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachine";
import { tempoState } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/tempoState/tempoState";
import { stateMenuState } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/stateMenuState/stateMenuState";
import { patternState } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/patternState";
import { ETimerStateMachineEventType } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
export var MetronomeStateMachine = setup({
    actors: {
    // timerStateMachineRef: null,
    },
    actions: {
        ON_OPEN_STATE_MENU: assign({
            lastState: function (_a) {
                var self = _a.self;
                return self.getSnapshot().value.toString();
            },
        }),
    },
}).createMachine({
    initial: EStateMachineState.tempoState,
    entry: [
        assign({
            timerStateMachineRef: function (_a) {
                var spawn = _a.spawn, self = _a.self;
                return spawn(TimerStateMachine, {
                    id: SINGLE_TIMER_MACHINE_ID,
                    input: {
                        metronomeStateMachine: self,
                    },
                });
            },
        }),
    ],
    on: (_a = {},
        _a[EMetronomeEvent.START_STOP_CLICK] = {
            actions: [
                sendTo(SINGLE_TIMER_MACHINE_ID, function (_a) {
                    var context = _a.context;
                    return {
                        type: context.isPlaying
                            ? ETimerStateMachineEventType.STOP
                            : ETimerStateMachineEventType.START,
                    };
                }),
                assign(function (_a) {
                    var context = _a.context;
                    return {
                        isPlaying: !context.isPlaying,
                        currentStep: -1, //Offset for first click
                    };
                }),
            ],
        },
        _a[EMetronomeEvent.TICK_TRIGGER] = {
            actions: [
                assign(function (_a) {
                    var _b = _a.context, tickTrigger = _b.tickTrigger, currentStep = _b.currentStep, pattern = _b.pattern;
                    return {
                        tickTrigger: !tickTrigger,
                        currentStep: (currentStep + 1) % pattern.length,
                    };
                }),
            ],
        },
        _a),
    context: INIT_METRONOME_STATE,
    states: {
        tempoState: tempoState,
        stateMenuState: stateMenuState,
        patternState: patternState,
        // patternChooseStepState,
    },
});
