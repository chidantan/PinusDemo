import {Code} from "../../../util/code";
import dispatch from "../../../util/dispatcher";
import {Application} from "pinus";



export default function (app: Application) {
	return new Handler(app);
}


export class Handler {
	constructor(private app: Application) {

	}


	async queryEntry(msg, session, next) {
		var uid = msg.uid;
		if (!uid) {
			return {
				code: Code.FAIL
			};
		}

		var connectors = this.app.getServersByType('connector');
		if (!connectors || connectors.length === 0) {
			return {
				code: Code.FA_NO_SERVER_AVAILABLE
			};
		}

		var res = dispatch(uid, connectors);
		return {
			code: Code.OK,
			host: res.clientHost,
			port: res.clientPort
		};
		// next(null, {code: Code.OK, host: res.pubHost, port: res.clientPort});
	}
}