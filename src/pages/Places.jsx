import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


import AccountNavbar from '../components/AccountNavbar';
import PlaceImg from '../components/PlaceImg';

function Places() {

    const [places, setPlaces] = useState([]);
    useEffect(() => {

        const fetchPlaces = async () => {
            try {
                const { data } = await axios.get('/user-places');
                setPlaces(data);
                // console.log(places);

            } catch (error) {
                console.log("Error fetching places", error);
            }
        }

        fetchPlaces();
    }, []);
    return (
        <div>
            <AccountNavbar />

            <div className="text-center ">

                <Link to='/account/places/new' className="inline-flex gap-2 bg-primary text-white rounded-full px-6 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Add new place
                </Link>
            </div>

            <div className='mt-4'>
                {(places.length > 0 && places.map((place, index) => (
                    <Link to={'/account/places/'+place.id} className=' flex gap-4 bg-gray-100 p-4 cursor-pointer rounded-2xl' key={index}>
                        <div className='w-32 h-32 flex bg-gray-300 shrink-0 grow rounded-sm'>
                            {/* {
                                (place.photos.length > 0 &&
                                    <img className='object-cover rounded-sm' src={'http://localhost:3000/'+place.photos[0]} alt="" />)
                                    
                            } */}
                            <PlaceImg place={place} />

                        </div>

                            <div className='grow-0 shrink'>
                            <h2 className='text-xl'>{place.title} </h2>
                            <p className='text-sm mt-2 '>{place.description}</p>

                            </div>
                      


                    </Link>
                )))}
            </div>


        </div>
    )
}

export default Places
