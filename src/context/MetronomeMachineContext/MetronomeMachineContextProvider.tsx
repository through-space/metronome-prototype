import { MetronomeStateMachineContext } from "./MetronomeMachineContext";
import { FC } from "react";

export const MetronomeMachineContextProvider: FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<MetronomeStateMachineContext.Provider>
			{children}
		</MetronomeStateMachineContext.Provider>
	);
};
