// 'use client';
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Camera from './Camera';
// import { longdo, map, LongdoMap } from './LongdoMap';
export default function Form({ pictureUrl, displayName }) {
    const [dataLocation, setDataLocation] = useState([]);
    const [location, setLocation] = useState({})


    // useEffect( () => {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             setLocation({
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //             })
    //             console.log(position.coords.latitude);
    //             console.log(position.coords.longitude);
    //         },
    //         (error) => {
    //             console.error(error)
    //         }
    //     )

    //     let apiUrl = "https://api.longdo.com/map/services/address?lon=" + 
    //         location.longitude + "&lat=" + location.latitude + "&key=" + process.env.LONGDO_API_KEY

    //          fetch(apiUrl)
    //         .then(res => res.json())
    //         .then(data => {
    //             setDataLocation(data);
    //             console.log('dataLocation=', dataLocation);
    //             console.log("location", location);
    //             console.log("apiUrl", apiUrl);
    //         }).catch((e) => { console.log("error", e) });

    // }, []);

    return (
        <div>
            <div className="flex justify-center">
                {pictureUrl ?
                    <Image
                        className=" m-5 bg-gray-300 border-2 border-gray rounded-full w-36 h-36 drop-shadow-lg"
                        src={pictureUrl}
                        alt={displayName}
                        width={500}
                        height={500}
                    /> :
                    <Image
                        className=" m-5 bg-gray-300 border-2 border-gray rounded-full w-36 h-36 drop-shadow-lg"
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt='picture'
                        width={500}
                        height={500}
                        priority={true}
                    />
                }
            </div>
            <div className="flex justify-center text-gray-600">Name : {displayName}</div>
            <div className="flex justify-center bg-red-100 mt-20">
                <form action="POST" className="text-gray-600 flex flex-col w-96   bg-pink-400">
                    {/* <button onClick={getLocation()}>Try It</button> */}
                    <span>รายละเอียดปัญหา :</span>
                    <input className=" p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" type="text" name="detail" placeholder="Enter message..." />
                    <select defaultValue={'DEFAULT'} className="mt-2 p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" id="cars" name="cars">
                        <option value="DEFAULT" disabled hidden>Choose here</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                        <option value="5">Five</option>
                    </select>
                    <button className="text-white p-1 mt-2 rounded-lg border border-gray-500  bg-emerald-500" type="submit" >save</button>

                </form>
            </div>
            <Camera />
        </div>
    )
}





