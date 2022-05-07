from collections import Counter
import math

def get_neighbours(row, col):
    return ((row - 1, col), (row + 1, col), (row, col - 1), (row, col + 1))


def day9(input):
    heightmap = [[int(n) for n in line] for line in input.splitlines()]
    lowpoints = list()

    last_row = len(heightmap) - 1
    last_col = len(heightmap[0]) - 1

    for rownum, row in enumerate(heightmap):
        for colnum, depth in enumerate(row):
            islowpoint = ((colnum == 0 or depth < row[colnum - 1])
                          and (colnum == last_col or depth < row[colnum + 1])
                          and (rownum == 0 or depth < heightmap[rownum - 1][colnum])
                          and (rownum == last_row or depth < heightmap[rownum + 1][colnum]))
            if islowpoint:
                lowpoints.append(depth)

    answer1 = sum([n + 1 for n in lowpoints])

    visited = dict()

    def should_visit(row: int, col: int):
        return (
            row >= 0 and row <= last_row
            and col >= 0 and col <= last_col
            and (row, col) not in visited)

    def visit(row: int, col: int):
        if heightmap[row][col] == 9:
            visited[row, col] = None
        else:
            neighbours = get_neighbours(row, col)
            basin = next((visited[xy] for xy in neighbours if xy in visited and visited[xy] is not None), (row, col))
            if basin:
                visited[row, col] = basin
            neighbours_to_visit = [(row, col) for (row, col) in neighbours if should_visit(row, col)]
            for nrow, ncol in neighbours_to_visit:
                visit(nrow, ncol)

    for rownum, row in enumerate(heightmap):
        for colnum, __ in enumerate(row):
            visit(rownum, colnum)

    basins = Counter(v for v in visited.values() if v)
    answer2 = math.prod(val for (__, val) in basins.most_common(3))
    
    return (answer1, answer2)


if __name__ == "__main__":
    input = ("2199943210\n"
             "3987894921\n"
             "9856789892\n"
             "8767896789\n"
             "9899965678")
    day9(input)
