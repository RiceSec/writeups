```py
from pwn import *
from sage.all import *

r = remote("20.169.252.240", 4200)
r.recvline()
r.recvline()

x = var('x')

while True:
    print(r.recvline())
    r.recvuntil(b": ")

    inp = r.recvline().decode().strip()
    expression, bounds = inp.split(" from ")
    low, high = map(int, bounds[:-1].split(" to "))

    answer = n(integrate(expression, x, low, high))
    print(expression, low, high, answer)

    r.sendline(str(answer).encode())

    print()
```
