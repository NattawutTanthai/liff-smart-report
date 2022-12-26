// 'use client';
import { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
export default function Form({ pictureUrl, displayName, address }) {
    const [type, setType] = useState([]);
    const [detail, setDetail] = useState("");
    const [phone, setPhone] = useState("");
    const [typeSelect, setTypeSelect] = useState("");


    async function getUser() {
        try {
            const urlApi = '/api/getTypes'
            const response = await axios.get(urlApi);
            // console.log(response);
            setType(response.data[0].type)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleSubmitForm = (e) => {
        e.preventDefault()
        console.log(detail, phone, typeSelect)
        console.log(type)


    }

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
                <form onSubmit={((e) => handleSubmitForm(e))} className="text-gray-600 flex flex-col w-96   bg-pink-400">
                    {/* <button onClick={getLocation()}>Try It</button> */}
                    <span>รายละเอียดปัญหา :</span>
                    <input onChange={(e) => setDetail(e.target.value)} className=" p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" type="text" name="detail" placeholder="Enter message..." />
                    <span>เบอร์ติดต่อ :</span>
                    <input onChange={(e) => setPhone(e.target.value)} className=" p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" type="text" name="phone" placeholder="Enter phone number..." />
                    <span>ประเภท :</span>
                    <select value={typeSelect} onChange={(e) => setTypeSelect(e.target.value)} className="mt-2 p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" id="cars" name="type">
                        <option value="DEFAULT" disabled hidden>Choose here</option>
                        {
                            type.map((value,index) => {
                                return (<option key={index}  value={value}>{value}</option>)
                            }
                            )
                        }
                    </select>
                    <span>สถานที่ปัจจุบันของคุณ :</span>
                    <input disabled className=" p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" type="text" name="location" placeholder={address} />
                    <button className="text-white p-1 mt-2 rounded-lg border border-gray-500  bg-emerald-500" type="submit" >save</button>
                </form>
            </div>
        </div>
    )
}






