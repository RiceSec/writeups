First, I found the AES key with `findaes`. Then I used the following script to try different initial values until one started with TUCTF.


```py
from Crypto.Cipher import AES

aes_key = bytes.fromhex('30 26 ca b7 05 3a 7b b6 32 a7 9a 4e 38 a1 4c 36')
with open('flag.txt', 'rb') as f:
  ciphertext = f.read()[:16]

with open('heap.mem', 'rb') as f:
  mem = f.read()

for addr in range(0, len(mem)):
  iv = mem[addr2:addr2+16]
  aes = AES.new( aes_key, AES.MODE_CBC, iv )
  res = aes.decrypt( ciphertext )
  if b'TUCTF' in res:
    print(hex(addr2), res)
```
