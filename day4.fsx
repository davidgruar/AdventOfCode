#load "Inputs.fs"
#load "String.fs"
open Advent2017

let hasDuplicates grouper items =
    items
    |> Seq.groupBy grouper
    |> Seq.map snd
    |> Seq.exists (fun grp -> Seq.length grp > 1)

let sortString (s: string) =
    s |> Seq.sort |> Array.ofSeq |> System.String |> string

let countPhrasesWithNoDuplicates grouper input =
    input
    |> String.splitLinesAndWords
    |> Array.filter (not << hasDuplicates grouper) |> Array.length    
  
let input = Inputs.download 4

let answer1 = countPhrasesWithNoDuplicates id input
let answer2 = countPhrasesWithNoDuplicates sortString input

printfn "Answer 1: %i" answer1
printfn "Answer 2: %i" answer2