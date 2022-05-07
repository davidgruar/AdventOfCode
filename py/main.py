import sys
from input import get_input
from daymap import daymap

if len(sys.argv) < 2:
    print("No year or day provided")
    exit(1)

if len(sys.argv) < 3:
    print("No day provided")
    exit(1)

year = sys.argv[1]
day = sys.argv[2]

if year in daymap and day in daymap[year]:
    input = get_input(year, day)
    (answer1, answer2) = daymap[year][day](input)
    print(f"Answer 1: {answer1}")
    print(f"Answer 2: {answer2}")
else:
    print(f"Day {day}/{year} not implemented!")
