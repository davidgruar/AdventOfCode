from typing import List


pairs = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}

pair_map = {v: k for k, v in pairs.items()}

illegal_char_values = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

completion_char_values = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}


def parse_line(line: str):
    stack = list[str]()
    for char in line:
        if char in pairs:
            stack.append(char)
        elif char in pair_map:
            if stack[-1] == pair_map[char]:
                stack.pop()
            else:
                return (char, stack)
    return (None, stack)

def completion_score(chars: List[str]):
    score = 0
    for char in chars:
        score = score * 5 + completion_char_values[char]
    return score

def day10(input: str):
    lines = input.splitlines()
    parsed = [parse_line(line) for line in lines]

    illegal = [char for (char, _) in parsed if char]
    answer1 = sum((illegal_char_values[char] for char in illegal))

    incomplete = [stack for (c, stack) in parsed if not c and stack]
    completion_chars = [[pairs[char] for char in reversed(chars)] for chars in incomplete]
    completion_scores = sorted([completion_score(cs) for cs in completion_chars])
    answer2 = completion_scores[len(completion_scores) // 2]

    return answer1, answer2


if __name__ == "__main__":
    input = ("[({(<(())[]>[[{[]{<()<>>\n"
             "[(()[<>])]({[<{<<[]>>(\n"
             "{([(<{}[<>[]}>{[]{[(<()>\n"
             "(((({<>}<{<{<>}{[]{[]{}\n"
             "[[<[([]))<([[{}[[()]]]\n"
             "[{[{({}]{}}([{[{{{}}([]\n"
             "{<[[]]>}<{[{[{[]{()[[[]\n"
             "[<(<(<(<{}))><([]([]()\n"
             "<{([([[(<>()){}]>(<<{{\n"
             "<{([{{}}[<[[[<>{}]]]>[]]")
    print(day10(input))
