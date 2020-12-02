module Advent2017.String
open System

let join (separator: string) (values: string[]) = String.Join(separator, values)

let split (separator: char) (str: string) = str.Split([|separator|], StringSplitOptions.RemoveEmptyEntries)

let splitLines = split '\n'

let splitWords = split ' '

let splitLinesAndWords = splitLines >> Array.map splitWords