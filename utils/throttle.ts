export function throttle(cb: any, delay = 1000) {
	// we declare if the should be called via shouldwait =false or if it should not  be called
	let shouldWait = false;
	// we save the arguments of the function so we can use them on a final call when the
	// timeout expires and no change occured
	let waitingArgs: any;
	const timeoutFunc = () => {
		// we first check if the waiting arguments is null (set later) and if true we set should wait to false
		if (waitingArgs == null) {
			shouldWait = false;
		} else {
			cb(...waitingArgs);
			waitingArgs = null;
			setTimeout(timeoutFunc, delay);
		}
	};

	return (...args: any) => {
		if (shouldWait) {
			waitingArgs = args;
			return;
		}

		cb(...args);
		shouldWait = true;
		setTimeout(timeoutFunc, delay);
	};
}

export function throttleFunction(cb: any, delay = 250) {
	let prev = 0;

	return function (...args: any) {
		const now = Date.now();
		console.log(prev - now);
		if (now - prev > delay) {
			prev = now;
			cb(...args);
		}
	};
}
