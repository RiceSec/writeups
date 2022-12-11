GDB time.

Set a breakpoint at the point where the input is compared to the passkey.

```
b *main+562
```

Run and enter arbitrary strings at the prompt:

```
r
```

When the breakpoint is hit:

```
x/s $rsi
```
