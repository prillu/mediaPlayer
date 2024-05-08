import { useState } from 'react'
import Add from '../components/add/Add'
import { Link } from 'react-router-dom'
import ViewSection from '../components/viewSection/ViewSection'
import Categories from '../components/Categories/Categories'

function Home() {
  const [addVideoResponse,setaddVideoResponse] = useState("")
  const [removeCategoryVideoResponse,setRemoveCategoryVideoResponse] = useState("")
 const[deleteVideoCategoryResponse,setDeleteVideoCategoryResponse]= useState("")

  return (
    <>
    <div className="container my-5 d-flex justify-content-between">
      <Add setaddVideoResponse = {setaddVideoResponse}/>
      <Link to={'/history'} >Watch History</Link>
    </div>
    <div className="container-fluid my-5 row">
    <div className="col-lg-6">
      <h3>All videos</h3>
      <ViewSection setDeleteVideoCategoryResponse={setDeleteVideoCategoryResponse} addVideoResponse = {addVideoResponse} removeCategoryVideoResponse={removeCategoryVideoResponse}/>
    </div>
    <div className="col-lg-6">
    <Categories deleteVideoCategoryResponse={deleteVideoCategoryResponse}  setRemoveCategoryVideoResponse={setRemoveCategoryVideoResponse} />
    </div>

    </div>
   
    </>
  )
}

export default Home