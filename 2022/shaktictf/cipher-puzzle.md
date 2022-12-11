Putting the ciphertext through a morse code converter:

```
01110101011100100110100101100111011110100111011101110011011110100110100001111011001101010111001000110100011001110011011101110111010100110011000001110110010100010011000001010000001101010011001101111101
```

Converting to bytes:

```py
>>> bytes.fromhex(hex(x)[2:])
b'urigzwszh{5r4g7wS0vQ0P53}'
```

I figured `urigzwszh` probably corresponds to `shaktictf`. Substituting the known characters in `5r4g7wS0vQ0P53` gives `5h4k7iC0vQ0P53`. Some guesswork then, gives `5h4k7iC0nM0R53`.
