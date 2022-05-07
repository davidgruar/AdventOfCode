import os
from dotenv import load_dotenv
from http.client import HTTPSConnection

load_dotenv()
session_token = os.environ["AOC_SESSION_TOKEN"]


def get_input(year, day):
    dir = f"inputs/{year}"
    filename = f"{dir}/{day}.txt"
    try:
        with open(filename, "r") as file:
            return file.read()
    except IOError:
        connection = HTTPSConnection("adventofcode.com")
        headers = {"cookie": f"session={session_token}"}
        connection.request("GET", f"/{year}/day/{day}/input", headers=headers)
        response = connection.getresponse()
        content = response.read().decode()
        os.makedirs(dir, exist_ok=True)
        with open(filename, "x") as file:
            file.write(content)
        return content
