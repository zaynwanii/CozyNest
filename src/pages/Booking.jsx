import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import AddressLink from '../components/AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import BookingDates from '../components/BookingDates';

function Booking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then((response) => {
        const foundBooking = response.data.find(({ booking_id }) => id == booking_id);
        setBooking(foundBooking);
        // console.log(foundBooking);

      })
    }
  }, []);

  if (!booking) {
    return '';
  }

  return (
    <div className='my-8 '>
      <h1 className='text-3xl'>{booking.title}</h1>
      <AddressLink >{booking.address} </AddressLink>
      <div className="bg-gray-200 p-6 my-6  rounded-2xl flex justify-between itens-center">

        <div>
          <h2 className="text-2xl mb-4">  Your Booking Information:</h2>
          <BookingDates booking={booking}/>
        </div>

        <div className='bg-primary p-6 text-white rounded-2xl'>

          <div>Total Price</div>
          <div className='text-3xl'>Rs.{booking.booking_price}</div>

        </div>

      </div>
      <PlaceGallery place={booking} />

    </div>
  )
}

export default Booking
