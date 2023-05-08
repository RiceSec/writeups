I couldn't get the executable to run on my machine, so instead of dynamic analysis I just simulated the `sub_100003E10` function from IDA's decompilation output in a C file.

```c
#include <stdint.h>
#include <stdio.h>

int dword_100008018 = 0x20B5D4FF;
int dword_10000801C = 0x32378FC7;
int dword_100008020 = 0x0D55F8767;
int dword_100008024 = 0x104AA1AD;

int64_t sub_100003E10() {
	unsigned int v1 = (dword_100008018 << 11) ^ dword_100008018;
	dword_100008018 = dword_10000801C;
	dword_10000801C = dword_100008020;
	dword_100008020 = dword_100008024;
	int64_t result = (v1 >> 8) ^ v1 ^ ((unsigned int)dword_100008024 >> 19) ^
					 dword_100008024;
	dword_100008024 ^= (v1 >> 8) ^ v1 ^ ((unsigned int)dword_100008024 >> 19);
	return result;
}

int main() {
	unsigned int v2;
	unsigned int v4 = 0;

	for (int i = 0; i < 5; ++i) {
		v2 = sub_100003E10();
		printf("%u\n", v2);
		v4 += v2 % 0x539;
	}

	printf("cvctf{%u}\n", v4);
	return 0;
}
```

```
2664865143
269578461
962373895
2086543432
1447638929
cvctf{4666}
```
