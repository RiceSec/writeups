The flag can be found at `https://vertical-traversal.tuctf.com/get/...%2fflag.txt`

The site is clearly using regular expressions to block access to any paths containing a `/`, but `%2f` unescapes to the same thing and is not detected.

`..` is also replaced with `.`, so using `...` causes the first `..` to be replaced with `.`, leaving us with `..`.
