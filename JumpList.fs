namespace Advent2017

type JumpList(initialJumps: int seq, increment: int -> int) =
    let jumps = Array.ofSeq initialJumps
    let mutable position = 0
    
    member this.Position with get() = position

    member this.IsOutOfBounds() =
        position < 0 || position >= jumps.Length

    member this.Jump() =
        if this.IsOutOfBounds() then this
        else
            let jump = jumps.[position]
            jumps.[position] <- increment jump
            position <- position + jump
            this

    member this.Log() =
        printfn "%s" (this.ToString())
        this        

    override this.ToString() =
        jumps
        |> Array.mapi (fun i jump -> if i = position then sprintf "(%i)" jump else jump.ToString())
        |> String.join " "