export var EIntervalActorEventType;
(function (EIntervalActorEventType) {
    EIntervalActorEventType[EIntervalActorEventType["SET_TEMPO"] = 0] = "SET_TEMPO";
})(EIntervalActorEventType || (EIntervalActorEventType = {}));
// export interface ITimerTickEvent extends EventObject {
// 	type: ETimerStateMachineEventType.TICK;
// }
//
// export interface ITimerStopEvent extends EventObject {
// 	type: ETimerStateMachineEventType.STOP;
// }
// export type TTimerPlayingStateEvent = ITimerTickEvent | ITimerStopEvent;
//
// export interface ITimerIntervalCallbackInput extends NonReducibleUnknown {
// 	tempo: number;
// }
// export interface IIntervalStateMachineActorLogic
// 	extends CallbackActorLogic<
// 		TTimerPlayingStateEvent,
// 		ITimerIntervalCallbackInput
// 	> {}
