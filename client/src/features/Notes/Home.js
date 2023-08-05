import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import axios from 'axios'
import { deleteNotes, getData } from './noteSlice'
function Home() {
  const notes= useSelector(state=>state.data)
const dispatch = useDispatch()


 const NotesData= async() => {
  
  let apiData = await axios.get('https://notes-api-jdue.onrender.com/getData') 
  dispatch(getData(apiData.data))
  console.log(apiData.data,"this is apiData")
  console.log("hello")
}

const delNotes= async(id)=>{
     deleteNotes(id)
     let deleteOp = await axios.delete(`/delete/${id}`)
     console.log(deleteOp)
     window.location.reload()

}
  

  useEffect(()=>{
    NotesData()
    console.log(notes)
  },[])
  return (
    <div>
      <div className='Navbar'>
        <h1>Note Application</h1>
        <button><Link to='/AddNote' className='text-link'>Add New Note</Link></button>
      </div>

     <div className='container-fluid'>

      <div className="row d-flex flex-wrap">
      
{notes.map((val)=>{
  return(
    <div className='card col-sm-12 col-md-5 m-md-4 p-2' style={{backgroundColor:`${val.color}`}} key={val._id}>
      <h1>{val.title}</h1>
      <p>{val.des}</p>
      <span>
      <Link to={`/edit/${val._id}`} className='text-white text-link'>Edit</Link></span>
      <span><button onClick={()=>delNotes(val._id)}>Delete</button></span>
    </div>
  )
})}
</div>
     </div>
    </div>
  )
}

export default Home