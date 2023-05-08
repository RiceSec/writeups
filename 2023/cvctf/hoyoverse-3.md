- $R_1 a + R_2 b + R_3 c + d \mod p = X_1$
- $X_1 a + R_1 b + R_2 c + d \mod p = X_2$
- $X_2 a + X_1 b + R_1 c + d \mod p = X_3$
- $X_3 a + X_2 b + X_1 c + d \mod p = X_4$
- $X_4 a + X_3 b + X_2 c + d \mod p = X_5$
- $X_5 a + X_4 b + X_3 c + d \mod p = X_6$
- $X_6 a + X_5 b + X_4 c + d \mod p = X_7$

$R_1$, $R_2$, and $R_3$ are unknown, but $X_1 \dots X_7$ are known. The modulus $p$ is also known.

I'm sure there's a way to do this with sage, but it was easier to look for the Mathematica method.


```
In[2] := X1 = 14169084828739113416
         X2 = 12950362233651727953
         X3 = 13081576751296291893
         X4 = 11189892724250189745
         X5 = 2366046383900978737
         X6 = 1749792629103627315
         X7 = 8575562236709928474

In[9] := Solve[{X3 a + X2 b + X1 c + d == X4, X4 a + X3 b + X2 c + d == X5,
           X5 a + X4 b + X3 c + d == X6, X6 a + X5 b + X4 c + d == X7}, {a, b,
           c, d}, Modulus -> 16200480981168924301]
Out[9] = { { d -> 104965581386017, c -> 57536211283509, b -> 53289257628021,
             a -> 133249034578798 } }
```

```py
from Crypto.Util.number import *

a = 133249034578798
b = 53289257628021
c = 57536211283509
d = 104965581386017

print(b''.join(list(map(long_to_bytes, [a, b, c, d]))))
```

```py
b'y0u_kn0w_Equ4T1on5_w411!'
```
