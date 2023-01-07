// 'use client';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import Swal from 'sweetalert2'

export default function Form({ lat, lon, imageBase64, displayName, address }) {
    const router = useRouter();
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

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const currentDate = dayjs();
        console.log(detail, '\n', phone, '\n', typeSelect, '\n', address)
        // console.log(imageBase64)
        // dayjs.locale('th')
        // console.log(currentDate.valueOf());
        if (imageBase64 == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณาถ่ายภาพปัญหาก่อนส่งคำร้อง',
            })
        } else if (phone.length != 10) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง',
            })
        } else if (typeSelect == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณาเลือกประเภทปัญหา',
            })
        } else {
            axios.post('/api/postOrder', {
                name: displayName, // ชื่อผู้ใช้
                detail: detail, // รายละเอียดปัญหา
                phone: phone, // เบอร์ติดต่อ
                type: typeSelect, // ประเภทปัญหา
                address: address, // ที่อยู่
                lat: lat, // ละติจูด
                lon: lon, // ลองติจูด
                imgStart: imageBase64, // รูปภาพเริ่มต้น
                imgEnd: 'NONE', // รูปภาพสิ้นสุด
                startDate_timeStamp: currentDate.valueOf(), // เวลาเริ่ม
                processDate_timeStamp: 'NONE', // เวลากำลังดำเนินการ
                endDate_timeStamp: 'NONE', // เวลาสิ้นสุด
                commentProcess: 'NONE', // ความคิดเห็นของผู้ดำเนินการ
                commentEnd: 'NONE', // ความคิดเห็นสิ้นสุด
            })
                .then(function (response) {
                    console.log(response);
                    let timerInterval
                    Swal.fire({
                        title: 'แจ้งปัญหาเสร็จสิ้น!',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                        }


                    }).then((result) => {
                        router.reload();
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <div>
            <div className="flex justify-center mt-2 mb-8">
                <form onSubmit={((e) => handleSubmitForm(e))} className="text-gray-600 flex flex-col w-96   ">
                    <span>รายละเอียดปัญหา :</span>
                    <input onChange={(e) => setDetail(e.target.value)} className=" p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" type="text" name="detail" placeholder="Enter message..." required />
                    <span>เบอร์ติดต่อ :</span>
                    <input onChange={(e) => setPhone(e.target.value)} className=" p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" type="tel" name="phone" maxLength={10} placeholder="Enter phone number..." required />
                    <span>ประเภท :</span>
                    <select defaultValue={'DEFAULT'} onChange={(e) => setTypeSelect(e.target.value)} className="mt-2 p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" id="cars" name="type" required>
                        <option value="DEFAULT" disabled hidden>โปรดเลือกประเภทปัญหา</option>
                        {
                            type.map((value, index) => {
                                return (<option key={index} value={value}>{value}</option>)
                            }
                            )
                        }
                    </select>
                    <span>สถานที่ปัจจุบันของคุณ :</span>
                    <input disabled className=" p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" type="text" name="location" placeholder={address} />
                    <button className="text-white text-xl p-3 mt-2 rounded-lg border border-gray-500  bg-emerald-500" type="submit" >แจ้งปัญหา</button>
                </form>
            </div>
        </div>
    )
}






