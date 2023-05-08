Since the key (before padding) is just two bytes long, we can comfortably bruteforce it.

```py
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

KEY_LEN = 2
BS = 16

iv = bytes.fromhex("1df49bc50bc2432bd336b4609f2104f7")
ct = bytes.fromhex("a40c6502436e3a21dd63c1553e4816967a75dfc0c7b90328f00af93f0094ed62")

for a in range(256):
    for b in range(256):
        key = pad(bytes([a, b]), BS)
        pt = AES.new(key, AES.MODE_CBC, iv).decrypt(ct)

        if b"cvctf" in pt:
            print(f"key = {key.hex()}")
            print(f"pt = {pt}")
            break
```
