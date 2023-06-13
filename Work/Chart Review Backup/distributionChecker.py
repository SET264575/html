import random
filename = "assigned.csv"

# d = reviewer dictionary
# e = reviewee dictionary 
with open(filename) as f:
    a = f.read()
    b = a.split('\n')
    d = {}
    for z in b:
        if z != '':
            c = z.split(',')
            if c[0] in d.keys():
                d[c[0]].append(c[1])
            else:
                d[c[0]] = [c[1]]


##for s in d.keys():
##    print(d[s])
##    random.shuffle(d[s])
##    print(d[s])

for s in d.keys():
    print(s,d[s])
    
e ={}
e['Wasinger'] = 0
for g in d.keys():
    e[g] = 0

for k in d.keys():
    for l in d[k][0:5]:
        e[l] = e[l] + 1

for k in e.keys():
    print(k,e[k])

    
    
        
