export var ETimerStateMachineEventType;
(function (ETimerStateMachineEventType) {
    ETimerStateMachineEventType["START"] = "START";
    ETimerStateMachineEventType["STOP"] = "STOP";
    ETimerStateMachineEventType["SET_TEMPO"] = "SET_TEMPO";
    // CLEAR_INTERVAL = "CLEAR_INTERVAL",
    ETimerStateMachineEventType["TICK"] = "TICK";
})(ETimerStateMachineEventType || (ETimerStateMachineEventType = {}));
// export interface IIntervalCallbackActor = Actor
// export interface IIntervalStateMachineActorLogic
// 	extends ActorLogic<
// 		Snapshot<ITimerStateMachineContext>,
// 		TTimerStateMachineEvent
// 	> {}
// export interface IIntervalStateMachineActorLogic
// 	extends ActorLogic<Snapshot<{ step: EStep }>, undefined> {}
export var ETimerMachineState;
(function (ETimerMachineState) {
    ETimerMachineState["idleState"] = "idleState";
    ETimerMachineState["playingState"] = "playingState";
})(ETimerMachineState || (ETimerMachineState = {}));
