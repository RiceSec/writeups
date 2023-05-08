```ocaml
# let files = Sys.readdir "." in
  Array.iter print_endline files;;
secret
Dockerfile
flag.txt
build.sh
- : unit = ()
# Sys.command "cat flag.txt";;
The real flag is not here...- : int = 0
# Sys.command "ls -l";;
total 20
-r-xr-xr-x 1 root root  260 Mar 26 02:04 Dockerfile
-r-xr-xr-x 1 root root  120 Mar 26 02:04 build.sh
-r-xr-xr-x 1 root root   28 Mar 26 02:04 flag.txt
dr-xr-xr-x 1 root root 4096 Mar 26 02:34 secret
- : int = 0
# let files = Sys.readdir "secret" in
  Array.iter print_endline files;;
flag-1d573e0faa99.json
- : unit = ()
# Sys.command "cat secret/flag-1d573e0faa99.json";;
{
    "message": "Flag is here. OCaml syntax is easy, right?",
    "flag": "cvctf{J41L3d_OOOO-C4mL@@}"
}- : int = 0

```
