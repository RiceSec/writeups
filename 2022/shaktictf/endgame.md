From level 1, we have:

> Word of advice,remember this:weYbdk9012ghiwh=0?

Entering `weYbdk9012ghiwh=0?` as the helpline id in `3. Use helpline` gives:

```py
{'__name__': '__main__', '__doc__': None, '__package__': None, '__loader__': <_frozen_importlib_external.SourceFileLoader object at 0x7f72267e4f10>, '__spec__': None, '__annotations__': {}, '__builtins__': <module 'builtins' (built-in)>, '__file__': '/endgame.py', '__cached__': None, 'banned': ['import', <built-in function print>, <built-in function exec>, <built-in function eval>, 'read', <built-in function open>, <built-in function globals>], 'sos': <module 'os' from '/usr/lib/python3.8/os.py'>, 'beat_the_master': <built-in function exec>, 'main': <function main at 0x7f72266dde50>, 'escape': <function escape at 0x7f72266ddee0>}
```

This, then, gets the flag:

```py
beat_the_master('print(sos.read(sos.open("./flag.txt", sos.O_RDONLY), 100))')
```

(I lost my original payload, but it was a little simpler than this one.)
