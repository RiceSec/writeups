```py
x = 0x56455a7059574e7459584a685a576c756557646f59565637633364765a57647664474e305a48427965584e4464476c6c62584e6c6257463165574e3059574e7a5647687a6247567a5a6d527a636d46796233427366513d3d
bs = x.to_bytes((x.bit_length() + 7) // 8, 'big')
dec = b64decode(bs)

flag = ''
i = 0
for _ in range(len(dec)):
    flag += dec[i]
    i = (i + 16) % (len(dec) - 1)

# replace the final `T` with a `}`
print(flag)
```
