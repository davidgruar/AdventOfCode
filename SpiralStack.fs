module Advent2017.SpiralStack

type XY = int * int

type Spiral<'T> = { Position: XY; Vector: XY; Length: int; Values: Map<XY, 'T> }

let empty = { Position = (0, 0); Vector = (1, 0); Length = 0; Values = Map.empty }

let init value = { Position = (0, 0); Vector = (1, 0); Length = 1; Values = Map.ofList [((0, 0), value)] }

let private rotateLeft vector =
    let (x, y) = vector
    (-y, x)

let private (++) (x, y) (x', y') = (x + x', y + y')

let nextVector stack =
    match stack.Length with
    | 0 | 1 -> stack.Vector
    | _ ->
        let leftTurnVector = rotateLeft stack.Vector
        let leftTurnPosition = stack.Position ++ leftTurnVector
        let isLeftTurnBlocked = Map.containsKey leftTurnPosition stack.Values
        if isLeftTurnBlocked then stack.Vector else leftTurnVector

let nextPositionFromVector vector stack =
    match stack.Length with
    | 0 -> stack.Position
    | _ -> stack.Position ++ vector

let nextPosition stack =
    let vector = nextVector stack
    nextPositionFromVector vector stack

let push value stack =
    let vector = nextVector stack
    let position = nextPositionFromVector vector stack
    let length = stack.Length + 1
    let values = stack.Values |> Map.add position value
    { Position = position; Vector = vector; Length = length; Values = values }

let get position stack = Map.find position stack.Values

let peek stack = get stack.Position stack

let tryGetValue position stack = Map.tryFind position stack.Values

let private rowAsArray minCol maxCol row stack =
    [minCol..maxCol]
    |> List.map (fun col -> tryGetValue (col, row) stack)
    |> Array.ofList

let toArray stack =
    let cells = stack.Values |> Map.toSeq |> Seq.map fst |> Seq.toList
    let extremes f pairs =
        let items = pairs |> List.map f
        (List.min items, List.max items)

    let (minX, maxX) = cells |> extremes fst
    let (minY, maxY) = cells |> extremes snd

    [|maxY..(-1)..minY|]
    |> Array.map (fun row -> rowAsArray minX maxX row stack)

let format stack =
    let formatCell = Option.map (sprintf "%A") >> Option.defaultValue " "
    let formatRow = Array.map formatCell >> String.join "\t"
    stack
    |> toArray
    |> Array.map formatRow
    |> String.join "\n"