#load "Inputs.fs"
open Advent2017
open System

// First star

let greatestDifference xs =
    let max = List.max xs
    let min = List.min xs
    max - min

let diffChecksum = List.sumBy greatestDifference

// Second star

let sort (a, b) = if a > b then (a, b) else (b, a)

let firstDivisor x xs' =
        xs' |> List.tryFind (fun x' -> x' % x = 0 || x % x' = 0)

let rec evenDivisors xs =
    match xs with
    | [_] | [] -> None
    | head::tail ->
        match firstDivisor head tail with
        | Some x -> Some <| sort (head, x)
        | None -> evenDivisors tail

let divisorResult xs =
    evenDivisors xs
    |> Option.map ((fun (a, b) -> a / b))
    |> Option.defaultValue 0

let divisorChecksum = List.sumBy divisorResult

// Parsing

let parseRow (row: string) =
    row.Split([|"\t"; " "|], StringSplitOptions.RemoveEmptyEntries)
    |> Array.map int
    |> List.ofArray

let parseInput (input: string) = 
    input.Split '\n'
    |> Array.filter (String.IsNullOrEmpty >> not)
    |> Array.map parseRow
    |> List.ofArray

// Tests

let example1 =
    @"5 1 9 5
    7 5 3
    2 4 6 8"
    |> parseInput

printfn "Example 1 checksum: %i" (diffChecksum example1)

let example2 =
    @"5 9 2 8
    9 4 7 3
    3 8 6 5"
    |> parseInput

printfn "Example 2 checksum: %i" (divisorChecksum example2)

// Answers

let input = Inputs.download 2 |> parseInput

let answer1 = diffChecksum input
let answer2 = divisorChecksum input

printfn "Answer 1: %i" answer1
printfn "Answer 2: %i" answer2