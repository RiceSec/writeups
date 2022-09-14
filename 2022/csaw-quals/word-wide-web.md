This challenge has a chain of links. Every page has one valid link among several broken ones (without `href` attributes). We can write a script to traverse through the chain.

Additionally, the pages require that you include a cookie that describes the path along the solution until that page, lest, else it just says "Booooo!".

```js
import jsdom from 'jsdom';
import got from 'got';

const HOST = '';
const PORT = '';

let path = '/';
let solChain = '';

while (true) {
	console.log(path);
	const res = await got(`http://${HOST}:${PORT}${path}`, {
		headers: {
			'Cookie': `solChain=${solChain}`,
		}
	});
	const {body} = res;
	const {document} = (new jsdom.JSDOM(body)).window;
	const link = document.querySelector('a[href]');
	path = link.href;
	solChain += `${path.substring(1)}%20`;
}
```

The script errors out when `link` is `null`, at which point we can just manually check the last-link for the flag.
