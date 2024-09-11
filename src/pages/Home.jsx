import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';





function Home() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const { data } = await axios.get('/places');
                // console.log(data);
                setPlaces(data);

            } catch (error) {
                console.log("Error fetching places from the server", error);
            }

        }
        fetchPlaces();
    }, []);
    return (
        <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {places.length > 0 && places.map(place => (
                <Link to={'/place/'+place.id} key={place.id}>
                    <div  className='bg-gray-500 mb-2 rounded-2xl flex'>
                        {place.photos?.[0] && (
                            <img className='rounded-2xl object-cover aspect-square' src={"http://localhost:3000/" + place.photos?.[0]} alt="" />
                        )}
                    </div>
                    <h1 className='px-2 font-semibold text-lg truncate leading-6' >{place.address}</h1>
                   <h2 className='px-2  text-gray-700 text-base leading-6'>{place.title}</h2> 
                   <div className='px-2 mt-1'>
                   <span className='font-semibold'>Rs. {place.price}</span>/night
                   </div>
                </Link>
            ))}
        </div>
    )
}

export default Home
