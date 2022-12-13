'use client';
'use strict';
import { useEffect } from 'react'
import Image from 'next/image'
import Camera from './Camera';

export default function Form({ pictureUrl, displayName }) {

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });

    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <Image
                    className=" m-5 bg-gray-300 border-2 border-gray rounded-full w-36 h-36 drop-shadow-lg"
                    src={pictureUrl}
                    alt={displayName}
                    width={500}
                    height={500}
                />
            </div>
            <div className="flex justify-center text-gray-600">Name : {displayName}</div>
            <div className="flex justify-center bg-red-100 mt-20">
                <form action="POST" className="text-gray-600 flex flex-col w-96   bg-pink-400">
                    {/* <button onClick={getLocation()}>Try It</button> */}
                    <span>รายละเอียดปัญหา :</span>
                    <input className=" p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" type="text" name="detail" placeholder="Enter message..." />
                    <select className="mt-2 p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" id="cars" name="cars">
                        <option selected disabled hidden>Choose here</option>
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
