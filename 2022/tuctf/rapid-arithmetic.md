```py
from pwn import *
import re
import time
from t2n import text2num
import roman
from morse3 import Morse as mor

ev = re.compile('^[0-9+\-*/\(\) ]+$')
so = re.compile('^[a-z, -]+$')
rn = '[IVXLCDM0]+'
ro = re.compile('^[IVXLCDM0+\-*/\(\) ]+$')
mo = re.compile('^[\.+\-*/\(\) ]+$')
aa = re.compile('^[0-9 ]+$')
plus_minus = re.compile('(?=plus)|(?=minus)|(?<=plus)|(?<=minus)')

def pm(s):
    if type(s) == int:
        return s
    if s.strip() == 'plus':
        return '+'
    if s.strip() == 'minus':
        return '-'
    return s

def f(line):
    line = list(
        map(
            lambda s: s if s.strip() in ['plus', 'minus'] else text2num(s.strip()),
            re.split(plus_minus, line.replace(' and ', ' '))
        )
    )
    line = list(map(lambda s: pm(s), line))
    lllll = list(map(str, line))
    reeeeeeee = ' '.join(lllll)
    return eval(reeeeeeee)

def roman_replace(r):
    if r.group(0) == '0':
        return str(0)
    return str(roman.fromRoman(r.group(0)))

def rep_replace(r):
    return r.group(1)

def g(line):
    subres = re.sub(rn, roman_replace, line)
    return eval(subres)

def morse_replace(r):
    if r.group(0) == '-':
        return '-'
    return mor(r.group(0)).morseToString()

def h(line):
    subres = re.sub('[\.-]+', morse_replace, line)
    return round(eval(subres.replace(' ', '')))

def i(line):
    subres = re.sub(r'([0-9=+])\1+', rep_replace, line)
    return round(eval(subres
        .replace('=', '-')
        .replace(' ', '')
        .replace('00', '0')))


r = remote('chals.tuctf.com', 30200)
r.recvline()
r.recvuntil(b'Answer: ')
r.sendline('2500')

while True:
    line = ''
    line = r.recvline(timeout=5).decode('utf-8').strip()

    if re.fullmatch(aa, line):
        r.recvline()
        legit = r.recvline()
        print('[]', legit)
        r.recvline()
        r.recvline()
        ans = i(legit.decode('utf-8').strip())
    elif re.fullmatch(ev, line):
        ans = eval(line.replace('/', '//'))
    elif re.fullmatch(so, line):
        ans = f(line)
    elif re.fullmatch(ro, line):
        ans = g(line)
    elif re.fullmatch(mo, line):
        ans = h(line)
    else:
        continue

    # print('problem:', line)
    print('answer:', int(ans))
    r.sendline((str(int(ans))).encode('utf-8'))
    r.recvline()

print(r.recvline())
print(r.recvline())
print(r.recvline())
print(r.recvline())
print(r.recvline())
print(r.recvline())
```
