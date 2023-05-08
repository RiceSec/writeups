```js
function magic1(uint x, uint n) public pure returns (uint) {
    // Something magic
    uint m = (1 << n) - 1;
    return x & m;
}
```

`magic1(uint x, uint n)` gives us the `n` least significant bits of `x`.

```js
function magic2(uint x) public pure returns (uint) {
    // Something else magic
    uint i = 0;
    while ((x >>= 1) > 0) {
        i += 1;
    }
    return i;
}
```

`magic2(uint x)` gives us the "inverse" of 'count leading zeroes' (I'm not sure what you would call this function).

The assertions in the `checker` function uniquely specify the flag. We can verify our steps by adding a test function to the contract and running it in the [Remix](https://remix.ethereum.org/) IDE, but I'll skip that here.

```js
modifier checker(bytes16 key) {
    require(bytes8(key) == 0x3492800100670155, "Wrong key!");
    require(uint64(uint128(key)) == uint32(uint128(key)), "Wrong key!");
    require(magic1(uint128(key), 16) == 0x1964, "Wrong key!");
    require(magic2(uint64(uint128(key))) == 16, "Wrong key!");
    _;
}
```

The first assertion tells us the first 8 bytes of the 16-byte key.

```
key = 0x3492800100670155????????????????
```

The second assertion tells us that the 64 least significant bits and the 32 least significant bits represent the same number. This gives away some zero bytes.

```
key = 0x349280010067015500000000????????
```

The third assertion gives away the two least significant bytes.

```
key = 0x349280010067015500000000????1964
```

Finally, the fourth assertion tells us there must be 16 "useful" bits in the 64 least significant bits, which is only possible if:

```
key = 0x34928001006701550000000000011964
```

Now, getting the flag is a matter of xor'ing the key and `goal`.

```js
function getflag(bytes16 key) public view returns (bytes16) {
    return bytes16(uint128(key) ^ uint128(goal));
}
```

Running that with our `key` in Remix gives `flag = 0x63766374667b73304c31645f7844447d`, which we can confirm is the correct solution through the `unlock` function.

Finally, converting the (big-endian) integer representation to bytes:

```py
In [1]: from pwn import *

In [2]: pack(0x63766374667b73304c31645f7844447d, 'all', endian='big')
Out[2]: b'cvctf{s0L1d_xDD}'
```
