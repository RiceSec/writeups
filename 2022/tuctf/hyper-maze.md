Using node turned out to be overkill since I ended up using regex to find the pages.

```js
import got from 'got';

let path = 'page_drawl99.html';

while (true) {
	console.log(path);

	const res = await got(`https://hyper-maze.tuctf.com/pages/${path}`);
	const {body} = res;
	path = [...body.matchAll(/page_[^\.]+.html/g)]
		.map(m => m[0])
		.find(m => m !== path);
}
```
