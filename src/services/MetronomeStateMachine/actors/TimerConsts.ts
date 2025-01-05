// import { ETimerActions } from "@services/MetronomeStateMachine/actors/TimerInterfaces";

// export const TimerCallback = ({ sendBack, receive }) => {
// 	console.log("TimerCallback runs");
// 	receive((event) => {
// 		debugger;
// 		if (event.type === ETimerActions.START) {
// 			console.log(event);
// 			debugger;
// 			console.log("Starting");
// 		} else if (event.type === ETimerActions.STOP) {
// 			console.log("Stopping");
// 		}
// 	});
// 	// console.log(123);
// 	return () => {
// 		console.log("cleanup");
// 	};
// };
