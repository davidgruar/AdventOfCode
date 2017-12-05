#load "String.fs"
#load "SpiralStack.fs"
open Advent2017

// Part 1

let createSpiral n =
    [1..n]
    |> Seq.fold (fun stack i -> SpiralStack.push i stack) SpiralStack.empty

let getDistance n =
    let spiral = createSpiral n
    let (x, y) = spiral.Position
    abs x + abs y

// Print example spiral
createSpiral 23 |> SpiralStack.format |> printfn "%s"

// Tests

let assertAnswer cell expected =
    let actual = getDistance cell
    if actual = expected
        then printfn "Distance from %i: %i" cell actual
        else failwithf "Distance from %i should be %i, was %i" cell expected actual

assertAnswer 1 0
assertAnswer 12 3
assertAnswer 23 2
assertAnswer 1024 31


// Answer

let input = 347991

printfn "Answer 1: %i" <| getDistance input


// Part 2

let getNeighbours (x, y) =
    [
        (x+1, y);
        (x+1, y+1);
        (x+1, y-1);
        (x, y+1);
        (x, y-1);
        (x-1, y);
        (x-1, y+1);
        (x-1, y-1);
    ]

let sumOfNeighbours (stack: SpiralStack.Spiral<int>) cell =
    cell
    |> getNeighbours
    |> List.sumBy (fun cell -> SpiralStack.tryGetValue cell stack |> Option.defaultValue 0)

let pushSumOfNeighbours stack =
    let position = SpiralStack.nextPosition stack
    let sum = sumOfNeighbours stack position
    SpiralStack.push sum stack

let firstValueLargerThanInput input =
    let rec inner stack =
        let position = SpiralStack.nextPosition stack
        let value = sumOfNeighbours stack position
        if value > input
            then value
            else inner (SpiralStack.push value stack)
    inner (SpiralStack.init 1)        

// Example
let example = SpiralStack.init 1
[1..100] |> List.fold (fun stack _ -> pushSumOfNeighbours stack) example
|> SpiralStack.format
|> printfn "%s"

// Answer

printfn "Answer 2: %i" <| firstValueLargerThanInput input