import { useState } from "react";
import "./App.css";
import { Metronome } from "@components/organisms/Metronome/Metronome";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1>Metronome6</h1>
			<Metronome />
		</>
	);
}

export default App;
