const getInterval = (fn, delay) => {
	return setInterval(fn, delay);
};

const someCallback = (event) => {
	let interval = getInterval(() => {}, delay);

	if (event === "eventName") {
		interval = getInterval(() => {}, delay);
	}
};
