


export enum Code {
	OK = 200,
	FAIL = 500,

	//Connect Server
	NO_PLAYER = 1000,
	FA_TOKEN_INVALID = 1001,
	FA_TOKEN_EXPIRE = 1002,
	FA_USER_NOT_EXIST = 1003,
	FA_TOKEN_ILLEGAL = 1004,

	FA_PLAYER_NAME_EXSIT = 1005,



	FA_NO_SERVER_AVAILABLE = 2001,


	FA_CHANNEL_CREATE = 3001,
	FA_CHANNEL_NOT_EXIST = 3002,
	FA_UNKNOWN_CONNECTOR = 3003,
	FA_USER_NOT_ONLINE = 3004,



	DEVICE_NOT_EXSIT = 4001,
}

export class DeviceAuthResult {
	public code: Code;
	public deviceID?: string;
}

export class UserAuthResult {
	public code: Code;
	public userID?: number;
	public userName?: string;
	public uuid?: string;
}