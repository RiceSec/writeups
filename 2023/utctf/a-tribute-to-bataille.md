The server would reject confessions about 90% of the time, but we can just send the same request until it goes through.

Based on the URL of the image of the cross on the webpage (`/images/img2.png`), I figured there may be a `/images/img1.png`:

![`"INSERT INTO confessions (text) VALUES (\"" + confession + "\");"`](/writeups/2023/utctf/media/img1.png)

The following confession dumps the contents of the `confessions` table, which includes the flag.

```
a"); select * from confessions; --
```

```
thanks for confessing[("I actually don't like security",), ('utflag{thanks_for_confessing_your_sins}',), [...]
```
