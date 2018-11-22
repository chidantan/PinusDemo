import { Application, RemoterClass, FrontendSession } from "pinus";
import { session } from "../../../util/configer";

import * as tokenService from '../../../util/token';
import { Code, DeviceAuthResult, UserAuthResult } from '../../../util/code';

var DEFAULT_SECRET = 'WqhHFxa0aVPmj3uP';
var DEFAULT_EXPIRE = 6 * 60 * 60 * 1000;	// default session expire time: 6 hours



export default function (app: Application) {
	return new AuthRemoter(app);
};


// UserRpc的命名空间自动合并
declare global {
	interface UserRpc {
		auth: {
			// 一次性定义一个类自动合并到UserRpc中
			//血的教训，这个地方的定义只是方便编程和代码提示而已，而且真正的远程调用名字是remote文件名字为准！这里的key要和文件名字一样
			//如果名字不一样，编译过了调用时候会出错
			//调用参数第一个是路由参数，第二个才是正在想传的参数。
			authRemote: RemoterClass<FrontendSession, AuthRemoter>;
		};
	}
}


export class AuthRemoter {

	private session: session;
	constructor(private app: Application) {
		this.session = app.get('session') || {};
	}

	async auth(token: string): Promise<DeviceAuthResult> {

		var res = tokenService.parse(token, DEFAULT_SECRET);
		const resultCode = new DeviceAuthResult();
		resultCode.code = Code.OK;
		if (!res) {
			resultCode.code = Code.FA_TOKEN_ILLEGAL;
			return resultCode;

		}

		// if (!checkExpire(res, this.session.expire)) {
		//     resultCode.code = Code.FA_TOKEN_EXPIRE;
		//     return resultCode;

		// }
		resultCode.deviceID = res.uid;
		return resultCode;
	};

	async authUser(token: string): Promise<UserAuthResult> {

		var res = tokenService.parseUser(token, DEFAULT_SECRET);
		const resultCode = new UserAuthResult();
		resultCode.code = Code.OK;
		if (!res) {
			resultCode.code = Code.FA_TOKEN_ILLEGAL;
			return resultCode;

		}

		// if (!checkExpire(res, this.session.expire)) {
		//     resultCode.code = Code.FA_TOKEN_EXPIRE;
		//     return resultCode;

		// }
		resultCode.userID = res.uid;
		return resultCode;
	};

}

/**
* Check the token whether expire.
*
* @param  {Object} token  token info
* @param  {Number} expire expire time
* @return {Boolean}        true for not expire and false for expire
*/
function checkExpire(token, expire): boolean {
	if (expire < 0) {
		// negative expire means never expire
		return true;
	}

	return (Date.now() - token.timestamp) < expire;
};


