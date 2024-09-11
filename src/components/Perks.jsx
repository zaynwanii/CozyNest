import React from 'react'

function Perks({perks ,setPerks}) {
    function handleCheckboxClick(e){
    const{name,checked}=e.target;
    
    if(checked){
        setPerks([...perks,name]);
    }else{
        setPerks(perks.filter(perk=>perk!=name));
        // setPerks([...perks.filter(perk=>perk!=name)]);
    }
// console.log(perks);
    }
  return (
    <div className='grid  gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2'>
    <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer">
        <input  checked={perks.includes('wi-fi')} name='wi-fi' onChange={handleCheckboxClick} type="checkbox" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
        </svg>

        <span> Wi-Fi</span>
    </label>

    <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer" >
        <input checked={perks.includes('parking')} name='parking' onChange={handleCheckboxClick} type="checkbox" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>

        <span>Free Parking</span>
    </label>

    <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer">
        <input checked={perks.includes('tv')} name='tv' onChange={handleCheckboxClick} type="checkbox" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
        </svg>

        <span>TV</span>
    </label>

    <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer" >
        <input checked={perks.includes('private-entrance')} name='private-entrance' onChange={handleCheckboxClick} type="checkbox" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>

        <span>Private Entrance</span>
    </label>

    <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer" >
        <input checked={perks.includes('long-stay')} name='long-stay' onChange={handleCheckboxClick} type="checkbox" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
        </svg>

        <span>Long Stays</span>
    </label>
    <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer" >
        <input checked={perks.includes('private-garden')} name='private-garden' onChange={handleCheckboxClick} type="checkbox" />

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" className="size-6">
            <g>
                <path d="M50 10 C30 20, 30 40, 50 50 C70 40, 70 20, 50 10 Z" />
                <path d="M50 10 C30 20, 30 40, 50 50 C70 40, 70 20, 50 10 Z" transform="rotate(90 50 50)" />
                <path d="M50 10 C30 20, 30 40, 50 50 C70 40, 70 20, 50 10 Z" transform="rotate(180 50 50)" />
                <path d="M50 10 C30 20, 30 40, 50 50 C70 40, 70 20, 50 10 Z" transform="rotate(270 50 50)" />
                <circle cx="50" cy="50" r="8" stroke="black" />
            </g>
        </svg>





        <span>Private Garden</span>
    </label>
</div>
  )
}

export default Perks
