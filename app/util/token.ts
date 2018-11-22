
import * as crypto from 'crypto';

// var crypto = require('crypto');

/**
 * Create token by uid. Encrypt uid and timestamp to get a token.
 * 
 * @param  {String} uid user id
 * @param  {String|Number} timestamp
 * @param  {String} pwd encrypt password
 * @return {String}     token string
 */
export  function create(uid, timestamp, pwd) {
	var msg = uid + '|' + timestamp;
	var cipher = crypto.createCipher('aes256', pwd);
	var enc = cipher.update(msg, 'utf8', 'hex');
	enc += cipher.final('hex');
	return enc;
};

/**
 * Parse token to validate it and get the uid and timestamp.
 * 
 * @param  {String} token token string
 * @param  {String} pwd   decrypt password
 * @return {Object}  uid and timestamp that exported from token. null for illegal token.     
 */
export  function parse(token:string, pwd:string) {
	var decipher = crypto.createDecipher('aes256', pwd);
	var dec;
	try {
		dec = decipher.update(token, 'hex', 'utf8');
		dec += decipher.final('utf8');
	} catch (err) {
		console.error('[token] fail to decrypt token. %j', token);
		return null;
	}
	var ts = dec.split('|');
	if (ts.length !== 2) {
		// illegal token
		return null;
	}
	return { uid: ts[0], timestamp: Number(ts[1]) };
};

/**
 * Parse token to validate it and get the uid and timestamp.
 * 
 * @param  {String} token token string
 * @param  {String} pwd   decrypt password
 * @return {Object}  uid and timestamp that exported from token. null for illegal token.     
 */
export  function parseUser(token, pwd) {
	var pwdnew64 = 'mVO1Li+ILa/HbkZZkx5hg9C5yygkzIDMmpQehFv/Vyk=';
	// var decipher = crypto.createDecipher('aes-256-cbc\'', pwd);
    var pwdnew =    new Buffer(pwdnew64, 'base64');
	var playload = new Buffer(token, 'base64').toString();
    var  playloadData = JSON.parse(playload) ;
	// var value =  new Buffer(playloadData.value, 'base64');
    var iv = Buffer.from(playloadData.iv, "base64");
    var value = Buffer.from(playloadData.value, "base64");

    // var value =  playloadData.value;
    // var iv =    new Buffer(playloadData.iv, 'base64');
	var decipher = crypto.createDecipheriv('aes-256-cbc', pwdnew, iv);
	var dec;
	try {
		dec = decipher.update(value, 'binary', 'utf8');
		dec += decipher.final('utf8');
	} catch(err) {
		console.error('[token] fail to decrypt token. %j', token);
		return null;
	}
	var ts = dec.split('|');
	if(ts.length !== 2) {
		// illegal token
		return null;
	}
	return {uid: ts[0], timestamp: Number(ts[1]?ts[1]:-1)};
};