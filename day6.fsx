#load "String.fs"
#load "Inputs.fs"
open Advent2017
open System.Collections.Generic

let reallocate blocks =
    let newArray = Array.copy blocks
    let max = Array.max newArray
    let indexOfMax = newArray |> Array.findIndex (fun block -> block = max)
    newArray.[indexOfMax] <- 0
    for i in [1..max] do
        let index = (indexOfMax + i) % newArray.Length
        newArray.[index] <- newArray.[index] + 1
    newArray

let commaJoin (items: int[]) = items |> Array.map string |> String.join ","

let getAnswers blocks =
    let rec inner blocks' (dict: Dictionary<string, int>) =
        let i = dict.Count + 1
        let transformed = reallocate blocks'
        let joined = commaJoin transformed
        if dict.ContainsKey joined then
            let iterationOfFirst = dict.[joined]
            (i, i - iterationOfFirst)
        else
            dict.[joined] <- i
            inner transformed dict
    inner blocks (Dictionary<string, int>())
    

let input = Inputs.download 6 
let blocks = input |> String.split '\t' |> Array.map int

let (answer1, answer2) = getAnswers blocks
printfn "Answer 1: %i" answer1
printfn "Answer 2: %i" answer2