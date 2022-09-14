The encryption function in `cipher.py` is flawed.

```py
    def encrypt(self, msg_poly, rand_poly):
        return (((self.h_poly).trunc(self.q) + msg_poly) % self.R_poly).trunc(self.q)
```

Notice that this implementation of `encrypt` doesn't even use `rand_poly`. In fact, it doesn't use any private parameters. It can be represented as:

$$c(x) \equiv [h(x) + m(x)] \pmod{R(x)}$$

Since $h(x)$ is just the public key, we can get the message by just subtracting $m(x)$ from the ciphertext polynomial $c(x)$.


```py
import numpy as np
from sympy.abc import x
from sympy import ZZ, Poly

n = 97
p = 3
r = Poly(x ** n - 1, x).set_domain(ZZ)
h = Poly(..., x, domain='ZZ') # output of `publickey_as_poly`
c = Poly(..., x, domain='ZZ') # output of `ciphertext_as_poly`

output = ((c - h) % r).trunc(p).all_coeffs()[::-1]
output = np.packbits(np.array(output).astype(int)).tobytes().hex()
output = bytes.fromhex(output)
print(output)
```

This gives `b'QuAnt3ntr0py'` and sending `solve_challenge QuAnt3ntr0py` to the server yields the flag.
