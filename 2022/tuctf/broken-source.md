Download the wasm file and run `strings`.

```sh
strings my_project.wasm
```

Notice `.\new_project_for_ctf_v28095.cpp`. The file `/wasm/new_project_for_ctf_v28095.cpp` has the flag in plaintext:

```c
// ...

__attribute__((noinline))
EMSCRIPTEN_KEEPALIVE char* get_flag( )
{
    /* Wow, epic compiler bug! */
    char flag[64] = "TUCTF{my_c0mp1l3r_0p71m1z35_m3_0u7!}";

   return flag;
}

int main()
{
    printf("Flag: %s\n", get_flag());
    return 0;
}
```
