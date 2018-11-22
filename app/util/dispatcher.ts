

export default function dispatch(uid, connectors) {
	var index = Number(uid) % connectors.length;
	return connectors[index];
};
