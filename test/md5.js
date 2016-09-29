"use strict";
var test = require('tape');

var md5 = require('../md5.js');

var md5_pairs = [
	[ '', 'd41d8cd98f00b204e9800998ecf8427e' ],
	[ 'hello', '5d41402abc4b2a76b9719d911017c592' ],
	[ 'The quick brown fox jumps over the lazy dog', '9e107d9d372bb6826bd81d3542a419d6' ],
	[ 'The quick brown fox jumps over the lazy dog.', 'e4d909c290d0fb1ca068ffaddf22cbd0' ],
	[ 'message', '78e731027d8fd50ed642340b7c9a63b3' ]
];


md5_pairs.forEach(function (pair) {
	test('md5 '+pair[0], function (t) {
		t.plan(2);
		t.equal(md5(pair[0]), pair[1]);
		t.equal(md5(pair[0]), pair[1]);
		t.end();
	});
});


var md5crypt_pairs = [
	[ [ 'hello', '$1$01234567' ], '$1$01234567$8imesxsCtZWLDOPevHEvu.' ],
	[ [ 'hello', '01234567' ], '$1$01234567$8imesxsCtZWLDOPevHEvu.' ],
	[ [ 'password', '$1$01234567' ], '$1$01234567$b5lh2mHyD2PdJjFfALlEz1' ],
	[ [ 'The quick brown fox jumps over the lazy dog', '$1$a' ], '$1$a$bcijBrS0CrSE/jnM0vp.n0' ],
	[ [ 'The quick brown fox jumps over the lazy dog.', '$1$b' ], '$1$b$TsGXWxAErZ0eD5oJ5UD7a/' ],
];

md5crypt_pairs.forEach(function (pair) {
	test('md5 '+pair[0], function (t) {
		t.plan(2);
		t.equal(md5.crypt(pair[0][0], pair[0][1]), pair[1]);
		t.equal(md5.crypt(pair[0][0], pair[0][1]), pair[1]);
		t.end();
	});
});

for (var i = 0, n = 9; i < n; ++i)
	(function (i) {
		test('salt('+i+' chars)', function (t) {
			var s = md5.salt(i);
			t.plan(2);
			t.equal(s.length, (i ? i : 8), 'check salt length');
			t.ok(/^[a-zA-Z0-9\.\/]+$/.test(s), 'check salt characters');
			t.end();
		});
	})(i);

test("md5.crypt(too long key)", function (t) {
	t.plan(1);
	t.throws(function () {
		md5.crypt(md5.salt(65));
	}, /too long key/);
	t.end();
});

test("md5.crypt(without salt)", function (t) {
	t.plan(1);
	var key = 'blah',
	    hash = md5.crypt(key);
	t.equal(hash, md5.crypt(key, hash));
	t.end();
});

