import  { useState } from 'react';
import { DragDropContext,Draggable,Droppable  } from 'react-beautiful-dnd';
import {Checkbox} from "@nextui-org/react";
const Gallery = () => {

  // array if image
  const imageGallery=[
    {
      id:1,
      image:'/images/image-1.webp'
    },
    {
      id:2,
      image:'/images/image-2.webp'
    },
    {
      id:3,
      image:'/images/image-3.webp'
    },
    {
      id:4,
      image:'/images/image-4.webp'
    },
    {
      id:5,
      image:'/images/image-5.webp'
    },
    {
      id:6,
      image:'/images/image-6.webp'
    },
    {
      id:7,
      image:'/images/image-7.webp'
    },
    {
      id:8,
      image:'/images/image-8.webp'
    },
    {
      id:9,
      image:'/images/image-9.webp'
    },
    {
      id:10,
      image:'/images/image-10.jpeg'
    },
    {
      id:11,
      image:'/images/image-11.jpeg'
    },
  ]

  // state of array 
  const [data,setData]=useState(imageGallery)
  // state of selected image array
  const [selectedImages, setSelectedImages] = useState([]);
  // to hide selected image count after delete image 
  const [trick,settrick]=useState(true)

  // to check and select image function
  const handleCheckboxChange = (id) => {
    settrick(true)
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
    
  };
  
// delete function
  const handleDeleteClick = () => {
    settrick(false)
    // delete selected image based on their id
    const updatedImageGallery = data.filter((image) => !selectedImages.includes(image.id));
   setData(updatedImageGallery)
   
  };
// drag and drop function
  const handleDragDrop=(results)=>{
const {source,destination,type}=results;

if (!destination) {
  return;
}
if (source.draggableId === destination.droppableId && source.index === destination.index ) {
  return
}

if (type==='group') {
 const reorderedData=[...data] ;
 const sourceIndex=source.index
 const destinationIndex=destination.index
 const [removeData]=reorderedData.splice(sourceIndex,1)
 reorderedData.splice(destinationIndex,0,removeData)
 return setData(reorderedData)
}

}

  return (
    //main div
    <div className='bg-slate-100'> 
       <h1 className='text-center font-semibold'>{data.length===0 ? "Refresh the Page" : ""}</h1>
    <div className='flex justify-center items-center lg:h-screen ' >
      {/* 2nd div */}
      <div className='border-2 border-slate-300 lg:w-[65%] w-[100%] rounded-xl bg-white '>
        {/* 3rd div */}
      <div className='border-b-2 py-2 flex justify-between font-semibold'>
        {
          selectedImages.length >0  && trick ? <> <div > 

          <Checkbox className='mx-1' defaultSelected color="primary"></Checkbox>
           <span  >
          {`${selectedImages.length} File selected`}
            </span>
           </div>
           <span className='cursor-pointer deletecount mx-3 text-red-600'onClick={handleDeleteClick} >Delete Files</span></> :  <h1 className='mx-5'>Gallery</h1>
        }
        </div>
        <DragDropContext  onDragEnd={handleDragDrop}>
  <Droppable droppableId='ROOT' type='group'>
    {(provided) => (
      <div className='grid lg:grid-cols-5 grid-cols-1 gap-1 ' {...provided.droppableProps} ref={provided.innerRef}>
        {data.map((image, index) => (
          <Draggable key={image.id} draggableId={image.id.toString()} index={index}>
            {(provided) => (
             <div
             key={image.id}
             className={`relative group m-2 ${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'} `}

            
             ref={provided.innerRef}
       
{...provided.draggableProps}
{...provided.dragHandleProps}
           >
             <label >
             <img
              className={` border-2 rounded-xl hover:brightness-50 transition duration-300 transform hover:scale-105 ${
               selectedImages.includes(image.id) ? 'brightness-75' : ''
             }`}
             src={image.image}
             alt='img'
             />
             <Checkbox  className={`absolute top-2 left-2 hidden group-hover:flex   ${
               selectedImages.includes(image.id) ? 'flex' : '' } `}
               color='primary'
                  checked={selectedImages.includes(image.id)}
                  onChange={() => handleCheckboxChange(image.id)}

              ></Checkbox>
             </label>
           </div>
            )}

          </Draggable>
        ))}
        {provided.placeholder}
        <div className='col-span-2 lg:col-span-1 lg:row-span-1 border-2 border-dotted rounded-xl flex flex-col justify-center items-center m-3 font-semibold'>
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
  <span>Add images</span>
  </div>
      </div>
    )}
  </Droppable>
</DragDropContext>

      </div>
  
  </div>
  </div>
  )
}

export default Gallery
