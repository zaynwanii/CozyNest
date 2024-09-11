// Single place page
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../components/AddressLink';

function Place() {
    const { id } = useParams();

    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
   

    useEffect(() => {
        if (!id) return;
        const fetchPlace = async () => {
            try {

                const { data } = await axios.get('/places/' + id);
                // console.log(data);
                setPlace(data[0]);

            } catch (error) {
                console.log(`Error fetching place with id:${id}`);
            }
        }


        fetchPlace();
    }, [id]);

    if (!place) {
        return <div>Loading...</div>; // Show loading state if place is null
    }

    



    return (
        <div className='mt-4 -mx-8 px-8 pt-8 bg-gray-100  '>

            <h1 className='text-3xl font-normal'>{place.title.toUpperCase()}</h1>
           
           <AddressLink >{place.address}</AddressLink>
           <PlaceGallery place={place} />

            <div className='mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
                <div>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.chechkin} <br />
                    Check-out: {place.checkout} <br />
                    Max no. of guests: {place.maxguests}
                </div>

                <div>
                    <BookingWidget place={place} />
                </div>

            </div>

            <div className="bg-white -mx-8 p-8 border-t ">
                <div>
                    <h2 className='font-semibold text-2xl'>Extra info</h2>
                </div>
                
                <div className="mb-4 mt-1 text-base text-gray-700 leading-5 ">
                    {place.extrainfo}
                </div>
            </div>


        </div>
    )
}

export default Place
