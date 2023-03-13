First, I found the name of the kernel:

```
$ vol.py -f debiantesting.core banners
Volatility 3 Framework 2.4.2
Progress:  100.00               PDB scanning finished                       
Offset  Banner

0x3c49cd0       Linux version 6.1.0-5-amd64 (debian-kernel@lists.debian.org) (gcc-12 (Debian 12.2.0-14) 12.2.0, GNU ld (GNU Binutils for Debian) 2.40) #1 SMP PREEMPT_DYNAMIC Debian 6.1.12-1 (2023-02-15)
0x1b0001a0      Linux version 6.1.0-5-amd64 (debian-kernel@lists.debian.org) (gcc-12 (Debian 12.2.0-14) 12.2.0, GNU ld (GNU Binutils for Debian) 2.40) # SMP PREEMPT_DYNAMIC Debian 6.1.12-1 (2023-02-15)
0x1b14eae0      Linux version 6.1.0-5-amd64 (debian-kernel@lists.debian.org) (gcc-12 (Debian 12.2.0-14) 12.2.0, GNU ld (GNU Binutils for Debian) 2.40) #1 SMP PREEMPT_DYNAMIC Debian 6.1.12-1 (2023-02-15)
0x1c56c680      Linux version 6.1.0-5-amd64 (debian-kernel@lists.debian.org) (gcc-12 (Debian 12.2.0-14) 12.2.0, GNU ld (GNU Binutils for Debian) 2.40) #1 SMP PREEMPT_DYNAMIC Debian 6.1.12-1 (2023-02-15)5)
```

From there, I was able to download `linux-image-6.1.0-5-amd64_6.1.12-1_amd64.deb` from the Debian packages site,
and used `dwarf2json linux boot/vmlinuz-6.1.0-5-amd64 > debiantesting.json` to convert it to a JSON file for volatility.

I then started a volatility shell instance with `volshell.py -f debiantesting.core -l`.

After poking through the Volatility sources to figure out how the shell worked and kernel sources to figure out exactly what I was looking for:
```
(layer_name) >>> context.modules['kernel'].object_from_symbol('tk_core').member('timekeeper').member('tkr_mono').member('base')
3686547075558
```

This value is stored in nanoseconds, so I divided by 1000 to get the final result of 3686547075 microseconds.
