f = open("users.txt", "r")
g = open("usersoutput.txt", "w")

g.write("{\n")

for line in f:
    t = line.split(" ")
    g.write("\t" + t[-1].strip() + ": \"" + t[0].strip() + "\",\n")
    print(t)

g.write("}")