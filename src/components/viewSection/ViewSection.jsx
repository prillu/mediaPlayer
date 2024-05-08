import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import VideoCard from "../VideoCard/VideoCard";
import { addVIdeoAPI, getVIdeoAPI,getSingleCategoryAPI,updateCategoryAPI } from '../../services/allAPI';




function ViewSection({setDeleteVideoCategoryResponse,addVideoResponse,removeCategoryVideoResponse}) {
  const [deleteResponse,setDeleteResponse] = useState("")

  const [allVideo, SetAllVideo] = useState([])
  console.log(allVideo);
  useEffect(()=>{
    getAllVideo()

  },[addVideoResponse,deleteResponse,removeCategoryVideoResponse])
const getAllVideo = async ()=>{
  try {
    const result = await getVIdeoAPI()
    console.log(result);
    if( result.status >=200 && result.status<300){
      SetAllVideo(result.data);
    }    
  } catch (error) {
    console.log(error);
  }
}
const dragOverView =  (e)=>{

  e.preventDefault();
}
const handleCategoryVideo = async(e)=>{
  const {categoryId,videoDetails}= JSON.parse(e.dataTransfer.getData("dataShare"));
  console.log(categoryId,videoDetails);
  try {
    const {data} = await getSingleCategoryAPI(categoryId)
    console.log(data);
    const updatedCategoryVideoList = data.allVideos.filter(item=>item.id!==videoDetails.id)
    console.log(updatedCategoryVideoList);
const {categoryName,id} =data
   const categoryResult = await updateCategoryAPI(categoryId,{id,categoryName,allVideos:updatedCategoryVideoList
    })
    setDeleteVideoCategoryResponse(categoryResult.data)
    await addVIdeoAPI(videoDetails)
    getAllVideo()
  } catch (err) {
    console.log(err);
    
  }
}

  return (
    <>
      <Row droppable={true} onDragOver={e=>dragOverView(e)} onDrop={e=>handleCategoryVideo(e)}>
      {
        allVideo.length>0?
        allVideo?.map(video=>(
          <Col key={video?.id} className="mb-4" sm={12} md={6} lg={4}>
            <VideoCard displayData = {video} setDeleteResponse={setDeleteResponse}/>
          </Col>
        ))
        :
        <div className="fw-bolder text-danger">Nothing to display</div>
      }
      </Row>
    </>
  );
}

export default ViewSection;
