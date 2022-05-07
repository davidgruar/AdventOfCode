from typing import List


def get_neighbours(row, col, row_len, col_len):
    possible_neighbours = [
        (row - 1, col - 1),
        (row - 1, col),
        (row - 1, col + 1),
        (row, col - 1),
        (row, col + 1),
        (row + 1, col - 1),
        (row + 1, col),
        (row + 1, col + 1)
    ]
    return [(r, c) for r, c in possible_neighbours if r >= 0 and r < row_len and c >= 0 and c < col_len]


def update(levels: List[List[int]]):
    result = [[n + 1 for n in level] for level in levels]
    check = True
    flashes = 0
    while check:  # any(any(n for n in level if n > 9) for level in levels):
        check = False
        for rownum, row in enumerate(result):
            for colnum, item in enumerate(row):
                # HACK
                if item > 9 and item < 100:
                    for (r, c) in get_neighbours(rownum, colnum, len(result), len(row)):
                        result[r][c] += 1
                    result[rownum][colnum] = 100
                    check = True
                    flashes += 1
    return ([[n if n < 100 else 0 for n in level] for level in result], flashes)


def day11(input: str):
    levels = [[int(n) for n in line] for line in input.splitlines()]
    flashes = 0

    for i in range(100):
        (levels, added_flashes) = update(levels)
        flashes += added_flashes
        print("\n".join("".join(map(str, line)) for line in levels), "\n")

    answer1 = flashes
    answer2 = None

    return answer1, answer2


if __name__ == "__main__":
    input = ("5483143223\n"
             "2745854711\n"
             "5264556173\n"
             "6141336146\n"
             "6357385478\n"
             "4167524645\n"
             "2176841721\n"
             "6882881134\n"
             "4846848554\n"
             "5283751526")
    print(day11(input))
