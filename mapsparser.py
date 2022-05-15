f = open("maps_temp.txt", "r")
s = "{\n"
for l in f:
    l = l.strip()
    print(l)
    tokens = l.split("|")
    print(tokens)
    ind2 = tokens[1].index("/revision")
    tokens[1] = tokens[1][0:ind2]
    s += "\t\""+tokens[0]+"\": \""+tokens[1]+"\",\n"

s += "}"
print(s)