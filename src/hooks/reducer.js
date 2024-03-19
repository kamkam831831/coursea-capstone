import { useReducer } from "react";

/**
 * This is a custom hook that can be used to submit a form and simulate an API call
 * It uses Math.random() to simulate a random success or failure, with 50% chance of each
 */
const useUpdateTimeReducer = () => {
   const reducer = (state, action) => {
      if (action.type == "selected-date-time"){
         let temp = [ ...state.availableTimes ]
         const index = temp.indexOf(`${action.date} ${action.time}`);
         temp.splice(index, 1);
         return { availableTimes: temp }
      } else if (action.type == "initialize-availableTimes"){
         if (state.availableTimes.length == 0){
            let temp = [ ]
            for (let i=0; i< action.data.length; i++){
               temp.push(`${action.data[i].date} ${action.data[i].time}`)
            }
            console.log('updated')
            return { availableTimes: temp }
         }
      }
      return state
   }
   const initializeTimes = { availableTimes: [] }

   const [ updateTimeState, updateTime] = useReducer(reducer, initializeTimes)
  

  return { updateTimeState, updateTime };
}

export default useUpdateTimeReducer;
