module Advent2017.Inputs
open System.IO
open System.Net

let load day =
    let path = sprintf "inputs/%i.txt" day
    File.ReadAllText path

let private cookiePath = ".sessionCookie"

let private getCookie() =
    if not (File.Exists cookiePath) then failwith ".sessionCookie file not found"
    File.ReadAllText cookiePath

let download day =
    let url = sprintf "http://adventofcode.com/2017/day/%i/input" day
    use client = new WebClient()
    client.Headers.Add (HttpRequestHeader.Cookie, getCookie())
    client.DownloadString url
    
