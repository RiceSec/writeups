Thanks to [this answer by Ella Rose](https://crypto.stackexchange.com/questions/67612/aes-oracle-with-bad-s-box#67614) to _AES oracle with bad S-box_ on Crypto.SE.

```py
from aes import AES

aes = AES()

equiv_key = bytes.fromhex('66687bf50272306355dd4d40ec454490')
ciphertext = bytes.fromhex('3384f87f781c394b79e331510540a4125a371b057b058d8e793521cd43f2ae94')

ppt_1 = [equiv_key[i % 16] ^ ciphertext[i] for i in range(16)]
ppt_2 = [equiv_key[i % 16] ^ ciphertext[i] for i in range(16, 32)]

aes.addRoundKey = lambda state, __: state
print(bytes(aes.decrypt(ppt_1, b'\x00' * 16, 16)))
print(bytes(aes.decrypt(ppt_2, b'\x00' * 16, 16)))
```
