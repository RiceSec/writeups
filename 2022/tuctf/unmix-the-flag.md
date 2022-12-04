```py
import string

upperFlag = string.ascii_uppercase[:26]
lowerFlag = string.ascii_lowercase[:26]

# ...

def unmix(oneLetter,num):

    if(oneLetter.isupper()):
        word = ord(oneLetter)-MIN_CAPLETTER
        shift = ord(num)-MIN_CAPLETTER
        return upperFlag[(word - shift)%len(upperFlag)]
    if(oneLetter.islower()):
        word = ord(oneLetter)-MIN_LETTER
        shift = ord(num)-MIN_LETTER
        return lowerFlag[(word - shift)%len(upperFlag)]

# print(unmix(mix('U', 'H'), 'H'))

def unpuzzled(puzzled):
    solveOne = ''
    i = 0
    while i < len(puzzled):
        if puzzled[i].isupper():
            a, b, c = puzzled[i:i+3]
            a_, b_, c_ = map(lambda x: ord(x) - MIN_CAPLETTER, [a, b, c])
            a__, b__, c__ = map(lambda x: '{0:05b}'.format(x), [a_, b_, c_])
            binary = a__ + b__ + c__
            ord_letter = int(binary, 2)
            letter = chr(ord_letter)
            solveOne += letter

            i += 3
        elif puzzled[i].islower():
            l, h = puzzled[i:i+2]
            l_, h_ = map(lambda x: ord(x) - MIN_LETTER, [l, h])
            l__, h__ = map(lambda x: '{0:01x}'.format(x), [l_, h_])
            six = l__ + h__
            ord_letter = int(six, 16)
            letter = chr(ord_letter)
            solveOne += letter

            i += 2
        else:
            print('what the')

    return solveOne

# ...

pz = 'ZBTZBHZBIZBSBSEzcawBSEzyzuawac'

for c in lowerFlag:
    unmixed = ''
    for count, alpha in enumerate(pz):
        unmixed += unmix(alpha, c)

    try:
        x = unpuzzled(unmixed)
        print('yay?', x)
    except:
        pass
```
