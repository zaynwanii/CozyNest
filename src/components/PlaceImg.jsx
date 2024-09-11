import React from 'react'

function PlaceImg({place,index=0,className=null}) {
    if(!place.photos?.length) return '';

    if(!className){
        className='object-cover rounded-sm';
    }

  return (
    <>
        <img className={className} src={'http://localhost:3000/'+place.photos[index]} alt="" />
    </>
      
   
  )
}

export default PlaceImg
