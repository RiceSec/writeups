```
$ docker load < dockREleakage.tar.gz
$ docker run -it dockre-chal
```

```
/chal # ls
flag.txt
/chal # cat flag.txt
73c73d_w17h1n_7h3_d0ck3rf1l3}
Find the rest of the flag by yourself!
```

Snipped for brevity:

```
$ docker history --no-trunc dockre-chal
CREATED BY
/bin/sh -c #(nop)  CMD ["/bin/sh"]
/bin/sh -c echo "Find the rest of the flag by yourself!" >> flag.txt
/bin/sh -c cat p-flag.txt > tmp.txt; rm -rf flag.txt p-flag.txt; mv tmp.txt flag.txt; echo "" >> flag.txt
/bin/sh -c echo "ZmxhZ3tuM3Yzcl9sMzR2M181M241MTcxdjNfMW5mMHJtNDcxMG5fdW5wcjA=" > /dev/null
/bin/sh -c #(nop) COPY file:... in p-flag.txt    29
/bin/sh -c #(nop) WORKDIR /chal
/bin/sh -c #(nop)  CMD ["/bin/sh"]
/bin/sh -c #(nop) ADD file:... in /              5.54M

$ echo 'ZmxhZ3tuM3Yzcl9sMzR2M181M241MTcxdjNfMW5mMHJtNDcxMG5fdW5wcjA=' | base64 -d
flag{n3v3r_l34v3_53n5171v3_1nf0rm4710n_unpr0
```

Combining the two parts, the flag is
```
flag{n3v3r_l34v3_53n5171v3_1nf0rm4710n_unpr073c73d_w17h1n_7h3_d0ck3rf1l3}
```
