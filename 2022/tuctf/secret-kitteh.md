```
binwalk secret_kitteh_.jpg

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             JPEG image data, JFIF standard 1.01
71041         0x11581         7-zip archive data, version 0.4
```

```sh
binwalk --dd='.*' --extract secret_kitteh_.jpg
```

This results in `_secret_kitteh_.jpg.extracted/11581`, which is an encrypted 7z file. The password is just `password`.
