```py
secret = list(map(chr, b'wisdom'))
key = [chr(0x04), chr(0x01), chr(0x12), chr(0x0f), chr(0x1b), chr(0x04), chr(0x14), chr(0x1d), chr(0x15), chr(0x1f), chr(0x3a), chr(0x32), chr(0x05), chr(0x36),  chr(0x10), chr(0x54), chr(0x3d), chr(0x3f), chr(0x44), chr(0x0a), chr(0x44), chr(0x45), chr(0x4e), chr(0x10)]
flag_list = None
new_secret = None
def secret_xor(secret, key):
    new_secret = (secret * (int(len(key)/len(secret))+1))[:len(key)]
    flag_list = [chr((ord(a) ^ ord(b))) for a,b in zip(new_secret, key)]
    return "".join(flag_list)

flag = secret_xor(secret,key)
print(flag)
```
