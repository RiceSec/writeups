```py
from pwn import *

wip = b'utflag{'

while True:
	print('wip', wip)
	for i in range(48, 127):
		p = process('./check')
		p.recvline()
		p.sendline(wip + chr(i).encode('utf-8'))

		res = p.recvline(timeout=3)
		if res == None or res == b'': # we found a prefix of the flag
			wip += chr(i).encode('utf-8')
			print(wip)
			break
```

The script would crash after finding every few characters, but I got around that by adjusting the starting guess and re-running it.
