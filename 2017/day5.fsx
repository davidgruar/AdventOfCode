#load "Inputs.fs"
#load "String.fs"
#load "JumpList.fs"
open Advent2017

let countJumpsToExit increment jumps =
    let jumpList = JumpList(jumps, increment)
    Seq.initInfinite (fun i -> i + 1)
    |> Seq.map (fun i -> (i, jumpList.Jump()))
    |> Seq.find (fun (_, jl) -> jl.IsOutOfBounds())
    |> fst

let add1 n = n + 1

let addOrSubtract1 n = if n >= 3 then n - 1 else n + 1

let getFirstAnswer jumps = countJumpsToExit add1 jumps

let getSecondAnswer jumps = countJumpsToExit addOrSubtract1 jumps


let input = Inputs.download 5

let values = input |> String.splitLines |> Array.map int

let answer1 = getFirstAnswer values
let answer2 = getSecondAnswer values

printfn "Answer 1: %i" answer1
printfn "Answer 2: %i" answer2