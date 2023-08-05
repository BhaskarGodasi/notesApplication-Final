import {  createSlice } from "@reduxjs/toolkit"
// import axios from "axios"


const initialState ={
    data:[]
   
}

// console.log(initialState)
const counterSlice = createSlice({
    name: 'Notes',
    initialState,
    reducers: {
      getData(state,action) {
        state.data=[...action.payload]
        console.log("state data..",state.data)
      },
      postNotes(state,action){
        state.data=[...state.data,action.payload]
      },
      updateNotes(state,action){
        const note = state.data.filter((val)=>{
          return val._id===action.payload._id &&action.payload
        })
        state.data=note
      },
      deleteNotes(state,action){
        const note =state.data.filter((val)=>{
          return val._id !==action.payload &&val
        })
        state.data=note
      }
    }
  })


//   export const NotesData=() =>(dispatch) => {
   
//     return fetch('https://notes-api-jdue.onrender.com/getData')
//       .then(response => response.json()).then(data=>{
//         console.log(data)
//         dispatch(getData(data))
//       })
// }
  


  export const { getData, postNotes , updateNotes ,deleteNotes} = counterSlice.actions
  export default counterSlice.reducer