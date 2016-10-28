function FF(a, b, c, d, m, s, k) {
	var n = a + (b & c | ~b & d) + (m >>> 0) + k;
	return ((n << s) | (n >>> (32 - s))) + b;
}

function GG(a, b, c, d, m, s, k) {
	var n = a + (b & d | c & ~d) + (m >>> 0) + k;
	return ((n << s) | (n >>> (32 - s))) + b;
}

function HH(a, b, c, d, m, s, k) {
	var n = a + (b ^ c ^ d) + (m >>> 0) + k;
	return ((n << s) | (n >>> (32 - s))) + b;
}

function II(a, b, c, d, m, s, k) {
	var n = a + (c ^ (b | ~d)) + (m >>> 0) + k;
	return ((n << s) | (n >>> (32 - s))) + b;
}


function byteToHex(byte) {
	return (256+(byte&255)).toString(16).substr(-2);
}


function bs(byte) {
	return String.fromCharCode(byte & 255);
}

function wordToBytes(word) {
	return bs(word) + bs(word >>> 8) + bs(word >>> 16) + bs(word >>> 24);
}


// converts utf8 string to bytes string
var utf8toBytes = function (utf8) {
	return unescape(encodeURIComponent(utf8));
};


// converts bytes string to 32-bits words array padded with "1" and zeros and bits_length for MD5 message buffer
function bytesToWords(bytes) {
	var bytes_count = bytes.length,
	    bits_count = bytes_count << 3,
	    words = new Uint32Array((bytes_count + 64) >>> 6 << 4);
	for (var i = 0, n = bytes.length; i < n; ++i)
		words[i >>> 2] |= bytes.charCodeAt(i) << ((i & 3) << 3);
	words[bytes_count >> 2] |= 0x80 << (bits_count & 31); // append "1" bit to message
	words[words.length - 2] = bits_count;
	return words;
}


var exports = module.exports = function md5(utf8) {
	return utf8toMD5(utf8).toHex();
};

var bytesToMD5 = exports.fromBytes = function (bytes) {
	var words = bytesToWords(bytes),
	    a = 0x67452301,
	    b = 0xEFCDAB89,
	    c = 0x98BADCFE,
	    d = 0x10325476,
	    S11 = 7, S12 = 12, S13 = 17, S14 = 22,
	    S21 = 5, S22 = 9 , S23 = 14, S24 = 20,
	    S31 = 4, S32 = 11, S33 = 16, S34 = 23,
	    S41 = 6, S42 = 10, S43 = 15, S44 = 21;

	for (var i = 0, ws = words.length; i < ws; i += 16) {
		var AA = a, BB = b, CC = c, DD = d;
		a = FF(a, b, c, d, words[i+0], S11, 0xD76AA478);
		d = FF(d, a, b, c, words[i+1], S12, 0xE8C7B756);
		c = FF(c, d, a, b, words[i+2], S13, 0x242070DB);
		b = FF(b, c, d, a, words[i+3], S14, 0xC1BDCEEE);
		a = FF(a, b, c, d, words[i+4], S11, 0xF57C0FAF);
		d = FF(d, a, b, c, words[i+5], S12, 0x4787C62A);
		c = FF(c, d, a, b, words[i+6], S13, 0xA8304613);
		b = FF(b, c, d, a, words[i+7], S14, 0xFD469501);
		a = FF(a, b, c, d, words[i+8], S11, 0x698098D8);
		d = FF(d, a, b, c, words[i+9], S12, 0x8B44F7AF);
		c = FF(c, d, a, b, words[i+10],S13, 0xFFFF5BB1);
		b = FF(b, c, d, a, words[i+11],S14, 0x895CD7BE);
		a = FF(a, b, c, d, words[i+12],S11, 0x6B901122);
		d = FF(d, a, b, c, words[i+13],S12, 0xFD987193);
		c = FF(c, d, a, b, words[i+14],S13, 0xA679438E);
		b = FF(b, c, d, a, words[i+15],S14, 0x49B40821);
		a = GG(a, b, c, d, words[i+1], S21, 0xF61E2562);
		d = GG(d, a, b, c, words[i+6], S22, 0xC040B340);
		c = GG(c, d, a, b, words[i+11],S23, 0x265E5A51);
		b = GG(b, c, d, a, words[i+0], S24, 0xE9B6C7AA);
		a = GG(a, b, c, d, words[i+5], S21, 0xD62F105D);
		d = GG(d, a, b, c, words[i+10],S22, 0x2441453);
		c = GG(c, d, a, b, words[i+15],S23, 0xD8A1E681);
		b = GG(b, c, d, a, words[i+4], S24, 0xE7D3FBC8);
		a = GG(a, b, c, d, words[i+9], S21, 0x21E1CDE6);
		d = GG(d, a, b, c, words[i+14],S22, 0xC33707D6);
		c = GG(c, d, a, b, words[i+3], S23, 0xF4D50D87);
		b = GG(b, c, d, a, words[i+8], S24, 0x455A14ED);
		a = GG(a, b, c, d, words[i+13],S21, 0xA9E3E905);
		d = GG(d, a, b, c, words[i+2], S22, 0xFCEFA3F8);
		c = GG(c, d, a, b, words[i+7], S23, 0x676F02D9);
		b = GG(b, c, d, a, words[i+12],S24, 0x8D2A4C8A);
		a = HH(a, b, c, d, words[i+5], S31, 0xFFFA3942);
		d = HH(d, a, b, c, words[i+8], S32, 0x8771F681);
		c = HH(c, d, a, b, words[i+11],S33, 0x6D9D6122);
		b = HH(b, c, d, a, words[i+14],S34, 0xFDE5380C);
		a = HH(a, b, c, d, words[i+1], S31, 0xA4BEEA44);
		d = HH(d, a, b, c, words[i+4], S32, 0x4BDECFA9);
		c = HH(c, d, a, b, words[i+7], S33, 0xF6BB4B60);
		b = HH(b, c, d, a, words[i+10],S34, 0xBEBFBC70);
		a = HH(a, b, c, d, words[i+13],S31, 0x289B7EC6);
		d = HH(d, a, b, c, words[i+0], S32, 0xEAA127FA);
		c = HH(c, d, a, b, words[i+3], S33, 0xD4EF3085);
		b = HH(b, c, d, a, words[i+6], S34, 0x4881D05);
		a = HH(a, b, c, d, words[i+9], S31, 0xD9D4D039);
		d = HH(d, a, b, c, words[i+12],S32, 0xE6DB99E5);
		c = HH(c, d, a, b, words[i+15],S33, 0x1FA27CF8);
		b = HH(b, c, d, a, words[i+2], S34, 0xC4AC5665);
		a = II(a, b, c, d, words[i+0], S41, 0xF4292244);
		d = II(d, a, b, c, words[i+7], S42, 0x432AFF97);
		c = II(c, d, a, b, words[i+14],S43, 0xAB9423A7);
		b = II(b, c, d, a, words[i+5], S44, 0xFC93A039);
		a = II(a, b, c, d, words[i+12],S41, 0x655B59C3);
		d = II(d, a, b, c, words[i+3], S42, 0x8F0CCC92);
		c = II(c, d, a, b, words[i+10],S43, 0xFFEFF47D);
		b = II(b, c, d, a, words[i+1], S44, 0x85845DD1);
		a = II(a, b, c, d, words[i+8], S41, 0x6FA87E4F);
		d = II(d, a, b, c, words[i+15],S42, 0xFE2CE6E0);
		c = II(c, d, a, b, words[i+6], S43, 0xA3014314);
		b = II(b, c, d, a, words[i+13],S44, 0x4E0811A1);
		a = II(a, b, c, d, words[i+4], S41, 0xF7537E82);
		d = II(d, a, b, c, words[i+11],S42, 0xBD3AF235);
		c = II(c, d, a, b, words[i+2], S43, 0x2AD7D2BB);
		b = II(b, c, d, a, words[i+9], S44, 0xEB86D391);
		a = (a + AA) >>> 0;
		b = (b + BB) >>> 0;
		c = (c + CC) >>> 0;
		d = (d + DD) >>> 0;
	}

	var hash_bytes = new String(wordToBytes(a) + wordToBytes(b) + wordToBytes(c) + wordToBytes(d));
	hash_bytes.toHex = function () {
		var hex = '';
		for (var i = 0, n = hash_bytes.length; i < n; ++i)
			hex += byteToHex(hash_bytes.charCodeAt(i));
		return hex;
	};
	return hash_bytes;
};


var utf8toMD5 = exports.fromUtf8 = function (utf8) {
	return bytesToMD5(utf8toBytes(utf8));
};



var b64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function to64(u, n) {
	for (var s = ''; --n >= 0; u >>>= 6)
		s += b64.charAt(u & 63);
	return s;
}


var MAX_KEY_LENGTH = 64,
    b64_map = [ 0,6,12, 1,7,13, 2,8,14, 3,9,15, 4,10,5, 11 ];


var gen_salt = exports.salt = function (n) {
	var s = '';
	if (!n)
		n = 8;
	do {
		s += b64.charAt( 64*Math.random() >>> 0 );
	} while (--n);
	return s;
};


exports.crypt = function (key, setting) {

	if (key.length > MAX_KEY_LENGTH)
		throw Error("too long key");

	if (!setting)
		setting = '$1$'+gen_salt();

	key = utf8toBytes(key);

	var salt = utf8toBytes(setting.replace(/^\$1\$([^$]+)(?:\$.*)?$/, '$1')),
	    md = bytesToMD5(key + salt + key),
	    s = key + '$1$' + salt;

	for (var kl = key.length; kl > 16; kl -= 16)
		s += md;

	s += md.slice(0, kl);

	for (var kl = key.length; kl; kl >>= 1)
		s += kl & 1 ? "\0" : key.charAt(0);

	md = bytesToMD5(s);

	for (var i = 0; i < 1000; ++i)
		md = bytesToMD5((i & 1 ? key : md) + (i % 3 ? salt : '') + (i % 7 ? key : '') + (i & 1 ? md : key));

	var h = '$1$'+salt+'$';

	for (var i = 0; i < 15; i += 3)
		h += to64(
			md.charCodeAt(b64_map[i+0]) << 16 |
			md.charCodeAt(b64_map[i+1]) << 8 |
			md.charCodeAt(b64_map[i+2]), 4);

	return h + to64(md.charCodeAt(b64_map[15]), 2);
};
