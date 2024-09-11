import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function BookingWidget({ place }) {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);
    

    useEffect(() => {
        if(user){
            setName(user.name)
        }
        
       
    }, [user]);

    let numberOfNights = 0;
    let price=0;

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
    if (numberOfNights>0){
        price=numberOfNights*place.price;
    }

    async function bookPlace() {
        
        const data={
            place,checkIn,checkOut,name,phone,price
        }
        try {
            const response=await axios.post('/bookings',data);
            console.log(response.data.id);
            const bookingId=response.data.id;
            setRedirect(`/account/bookings/${bookingId}`);
        } catch (error) {
            console.log('Error booking place',error);
            
        }
       
        
    }

    if(redirect){
        return (
            <Navigate to={redirect} />
        )
    }

    return (

        <div>
            <div className="bg-white shadow p-4 rounded-2xl">
                <div className='text-2xl text-center'>
                    Price:&#8377;{place.price}/night
                </div>


                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className='  py-3 px-4 '>
                            <label>Check in: </label>
                            <input type="date"
                                value={checkIn}
                                onChange={ev => setCheckIn(ev.target.value)}
                            />
                        </div>

                        <div className='  py-3 px-4 border-l '>
                            <label>Check out: </label>
                            <input type="date"
                                value={checkOut}
                                onChange={ev => setCheckOut(ev.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className='  p-4 border-t'>
                            <label>Number of guests: </label>
                            <input type="number"
                                value={numberOfGuests}
                                onChange={ev => setNumberOfGuests(ev.target.value)}
                            />
                        </div>
                    </div>

                    {numberOfNights>0 && (
                        <div className='  p-4 border-t'>
                            <label>Full Name</label>
                            <input type="text"
                                value={name}
                                onChange={ev => setName(ev.target.value)}
                            />
                            <label>Phone number</label>
                            <input type="tel"
                                value={phone}
                                onChange={ev => setPhone(ev.target.value)}
                            />
                        </div>
                        
                    )}

                </div>


                <button className="mt-4 primary" onClick={bookPlace}>
                    Book this place
                    {numberOfNights > 0 &&
                        (<span> &#64; &#8377;{(price)}</span>)}

                </button>
            </div>
        </div>
    )
}

export default BookingWidget
