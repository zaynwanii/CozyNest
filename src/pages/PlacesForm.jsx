import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';

import PhotosUploader from '../components/PhotosUploader';
import Perks from '../components/Perks';
import AccountNavbar from '../components/AccountNavbar';

function PlacesForm() {


    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState('');


    const { id } = useParams();

    useEffect(() => {

        if (!id) return;

        const fetchData = async () => {
            try {
                const { data } = await axios.get('/places/' + id);
                // console.log(data[0]);
                const place = data[0];

                setTitle(place.title);
                setAddress(place.address);
                setAddedPhotos(place.photos);
                setDescription(place.description);
                setPerks(place.perks);
                setExtraInfo(place.extrainfo);
                setCheckIn(place.chechkin);
                setCheckOut(place.checkout);
                setMaxGuests(place.maxguests);
                setPrice(place.price)

            } catch (error) {
                console.log("Error fetching previous data for place", error);
            }


        }

        fetchData();
    }, [id]);


    function inputHeader(text) {
        return (<h2 className='text-2xl mt-4'>{text}</h2>);
    }

    function inputDescription(text) {
        return (<p className='text-gray-500 text-sm'>{text}</p>)
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function savePlace(e) {
        e.preventDefault();
        const data = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests,price
        }
        if (id) {
            // Update existing place
            try {
                const response = await axios.put('/places', { id, ...data });
                //    console.log(response.data);
                setRedirect('/account/places');
            } catch (error) {
                console.log("Error adding new place", error);
            }

        } else {
            // Add new place
            try {
                const response = await axios.post('/places', data);
                //    console.log(response.data);
                setRedirect('/account/places');
            } catch (error) {
                console.log("Error adding new place", error);
            }
        }


    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (

        <div>
            <AccountNavbar />
            <form onSubmit={savePlace}>

                {preInput('Title', 'Title for your place.(Should be short)')}
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text" placeholder='Title'
                />

                {preInput('Address', 'Address to this place.')}
                <input
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    type="text"
                    placeholder='Address'
                />

                {preInput('Photos', 'Add some pictures of your place.(10 at max)')}
                <PhotosUploader
                    addedPhotos={addedPhotos}
                    setAddedPhotos={setAddedPhotos}

                />


                {preInput('Description', 'Detailed description of your place.')}
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className='h-40'
                />

                {preInput('Perks', 'Perks you offer.')}
                <Perks perks={perks} setPerks={setPerks} />

                {preInput('Extra info', 'Some extra details you want to add.')}
                <textarea
                    value={extraInfo}
                    onChange={e => setExtraInfo(e.target.value)}
                    className='h-40'
                />

                {preInput('Check in/out time.', 'Suitable time for checking in/out')}
                <div className='grid gap-2 grid-cols-2 md:grid-cols-4 '>
                    <div>
                        <h3 className="mt-2 -mb-1">Check-in time</h3>
                        <input
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)}
                            type="text"
                            placeholder='14:00'
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check-out time</h3>
                        <input
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)}
                            type="text"
                            placeholder='14:00'
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max guests</h3>
                        <input
                            value={maxGuests}
                            onChange={e => setMaxGuests(e.target.value)}
                            type="number"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input
                            value={price}
                            placeholder='Rs.'
                            onChange={e => setPrice(e.target.value)}
                            type="number"
                        />
                    </div>


                </div>


                {/* <button className='primary  my-4 mx-2 w-1/2'>Save</button> */}
                <div className='flex justify-center'>
                    <button className='primary' style={{ width: '50%', maxWidth: '300px', marginTop: '10px' }}>Save</button>
                </div>



            </form>
        </div>
    )
}

export default PlacesForm
