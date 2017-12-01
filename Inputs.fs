module Advent2017.Inputs
open System.IO

let load day =
    let path = sprintf "inputs/%i.txt" day
    File.ReadAllText path