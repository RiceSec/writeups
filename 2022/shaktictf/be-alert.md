```html
<!-- Something appears in /flag.html -->
```

On `/flag.html`:

```html
<script>
	<!--
		let word = "rg`jsh`clhm";
		let password = "";
		function chall(word) {
			for (let i=0; i<word.length;i++) {
				password += String.fromCharCode(word.charCodeAt(i) + 1);
			}
			return password
		}
	-->
</script>
```

`chall(word)` gives `shaktiadmin`, and entering that into the password field pops up an alert with the flag.
