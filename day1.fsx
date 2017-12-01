#load "Inputs.fs"
open Advent2017

let circularPairwise xs =
    (List.last xs, List.head xs) :: List.pairwise xs

let equalPairs pairs =
    pairs
    |> List.filter(fun (a, b) -> a = b)
    |> List.map(fun (a, _) -> a)

let sumOfEqualPairs (pairs: (int * int) list) =
    pairs
    |> equalPairs
    |> List.sum

let sumOfDigitsMatchingNext (xs: int list) =
    xs
    |> circularPairwise
    |> sumOfEqualPairs    

let pairwiseHalfWayRound xs =
    let length = List.length xs
    let halfwayIndex i = (i + length/2) % length
    xs |> List.mapi (fun i x -> (x, xs.[halfwayIndex i]))

let sumOfDigitsMatchingHalfwayRound xs =
    pairwiseHalfWayRound xs
    |> sumOfEqualPairs


let input = Inputs.load 1

let inputAsIntList = input |> Seq.map (string >> int) |> List.ofSeq

let firstAnswer = inputAsIntList |> sumOfDigitsMatchingNext
let secondAnswer = inputAsIntList |> sumOfDigitsMatchingHalfwayRound

printfn "First answer: %i" firstAnswer
printfn "Second answer: %i" secondAnswer