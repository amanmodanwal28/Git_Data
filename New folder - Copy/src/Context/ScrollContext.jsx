import { createContext, useState } from "react";

export const ScrollContext=createContext();


const ScrollContextProvider = ({children}) => {
    const [scrollref,setscroll]=useState(null)
  return (
   <ScrollContext.Provider value={{scrollref,setscroll}}>
    {children}
   </ScrollContext.Provider>
  )
}

export default ScrollContextProvider