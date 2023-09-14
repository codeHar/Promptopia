"use client"

import Damn from "@components/Damn"
import { useCallback, useEffect, useState } from "react"


const TryFunc = () => {
    const [counter,setCounter]=useState(0)
    let value="damn"
    console.log(counter)

    // const damn=useCallback(()=>{console.log("qweqwe")},[value])
    const damn=()=>console.log("first")

    useEffect(()=>{
        console.log(value)
    },[value])


  return (
    <div>TryFunc
        <div>
            <Damn damn={damn}/>
        </div>

        <button onClick={()=>setCounter(prev=>prev+1)}>Kick me</button>

    </div>
  )
}

export default TryFunc