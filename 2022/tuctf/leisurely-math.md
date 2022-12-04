```py
from pwn import *
r = remote('chals.tuctf.com', 30202)

while True:
    line = r.recvline()
    print(line)

    if b'(' in line or b')' in line or b'eval' in line or b'[' in line or b']' in line or b'{' in line:
        continue

    ans = eval(line)
    print(ans)
    r.sendline(str(ans))
    print(r.recvline())

print(r.recvline())
print(r.recvline())
print(r.recvline())
print(r.recvline())
print(r.recvline())
print(r.recvline())
```
