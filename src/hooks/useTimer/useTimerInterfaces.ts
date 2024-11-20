export enum EStep {
	PAUSE = "PAUSE",
	LOW = "LOW",
	HIGH = "HIGH",
}

export type onTickHandler = (step: EStep) => void;

export interface IUseTimerProps {
	pattern: EStep[];
	tempo: number;
	isPlaying: boolean;
	onTickHandlers?: onTickHandler[];
}
