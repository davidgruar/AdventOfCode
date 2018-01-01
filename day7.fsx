#load "String.fs"
#load "Inputs.fs"
open System
open Advent2017
open System.Text.RegularExpressions

type Disc = { Name: string; Weight: int; Children: string list }

type DiscTree = { Name: string; Weight: int; Discs: DiscTree list }

let parse line =
    let match1 = Regex.Match(line, "^([a-z]+) \((\d+)\)")
    let name = match1.Result("$1")
    let weight = match1.Result("$2") |> int
    let match2 = Regex.Match(line, "-> ([a-z ,]+$)")
    let children =
        if match2.Success
        then
            match2.Result("$1").Split([|','; ' '|], StringSplitOptions.RemoveEmptyEntries)
        else Array.empty
    { Name = name; Weight = weight; Children = List.ofArray children }

let build discs =
    let rec buildInner (discs, trees) =
        let buildChildren disc =
            match disc.Children with
            | [] -> Some []
            | xs ->
                if List.forall (fun x -> Map.containsKey x trees) xs
                then Some (List.map (fun x -> Map.find x trees) xs)
                else None
        let buildTree disc =
            buildChildren disc
            |> Option.map (fun children -> { Name = disc.Name; Weight = disc.Weight; Discs = children })
        match discs with
        | [] -> None
        | [x] -> buildTree x
        | x::rest ->
            let tree = buildTree x
            match tree with
            | Some t -> buildInner (rest, Map.add t.Name t trees)
            | None -> buildInner (List.append rest [x], trees)
    buildInner (discs, Map.empty)

let buildFromString text =
    text
    |> String.splitLines
    |> Array.map parse
    |> List.ofArray
    |> build

let print tree =
    let rec printInner tree indent =
        let whitespace = String.replicate indent " "
        printfn "%s%s (%i)" whitespace tree.Name tree.Weight
        for child in tree.Discs do printInner child (indent + 2)
    printInner tree 0

let rec getWeight tree =
    tree.Weight + List.sumBy getWeight tree.Discs

let findOddOne projection list =
    let groups = list |> List.groupBy projection |> List.sortBy (fun (_, items) -> items.Length)
    match groups with
    | [(_, [oddOne]); (mainValue, _::_)] -> Some (oddOne, mainValue)
    | _ -> None

let findMissingWeight tree =
    let rec inner tree deficit =
        let oddWeight = tree.Discs |> findOddOne getWeight
        match oddWeight with
        | None -> tree.Weight - deficit
        | Some (odd, expected) -> inner odd ((getWeight odd) - expected)
    inner tree 0


// Test

let sample = @"
pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)"

let sampleTree = buildFromString sample |> Option.get

printfn "Sample tree bottom program: %s" sampleTree.Name
printfn "Sample tree missing weight: %i" (findMissingWeight sampleTree)


// Answers

let input = Inputs.download 7
let tree = buildFromString input |> Option.get

let answer1 = tree.Name
let answer2 = findMissingWeight tree

printfn "Answer 1: %s" answer1
printfn "Answer 2: %i" answer2