import { useEffect } from "react"


const Damn = ({damn}) => {

    useEffect(()=>{
        console.log("call from damn")
    },[damn])

  return (
    <div>Damn</div>
  )
}

export default Damn