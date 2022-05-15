f = open("achievements.txt", "r")
g = open("achieveoutput.txt", "w")

g.write("{\n")

for line in f:
    t = line.split("\t")
    if t[2] == "":
        t[2] = 0
    if t[3].strip() == "":
        t[3] = 0
    g.write("\t" + t[0] + ": [\"" + t[1].strip() + "\", " + str(t[2]) + ", " + str(t[3]).strip() + "],\n")

g.write("}")