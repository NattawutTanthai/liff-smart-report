import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import Swal from 'sweetalert2'
import Axios from '../axios.config'
import axios from 'axios'


export default function Form({ lat, lon, displayName, imageBase64, address, typeData }) {
    const token_group = {
        token_bin: "mPowMUb0CtGMXW3GWdSkBCSjzVSyxWpl7IyIAvtvq4g",
        token_school: "EVb9MXEomIzpGRwQsBMuFDAfTnv3MhEDu7DPkFimwej",
        token_road: "b8PFtPNsdkb9uMy4UFydn11VHfKNI8iE7NlruulmfIK",
    }
    const router = useRouter();
    const [type, setType] = useState([]);
    const [detail, setDetail] = useState("");
    const [phone, setPhone] = useState("");
    const [typeSelect, setTypeSelect] = useState("");
    const [errors, setErrors] = useState("");

    const ck_type = async (data) => {
        if (data = "ขยะ") {
            return token_group.token_bin;
        } else if (data = "ถนน") {
            return token_group.token_road;
        } else if (data == "ห้องเรียน") {
            return token_group.token_school;
        }
    }


    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const currentDate = dayjs();
        console.log(detail, '\n', phone, '\n', typeSelect, '\n', address)
        if (imageBase64 == "") {
            Swal.fire({
                icon: 'error',
                title: 'อุ๊ปส์...',
                text: 'กรุณาถ่ายภาพปัญหาก่อนส่งคำร้อง',
            })
        } else if (phone.length != 10) {
            Swal.fire({
                icon: 'error',
                title: 'อุ๊ปส์...',
                text: 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง',
            })
        } else if (detail == "") {
            Swal.fire({
                icon: 'error',
                title: 'อุ๊ปส์...',
                text: 'กรุณากรอกรายละเอียดปัญหา',
            })
        } else if (typeSelect == "") {
            Swal.fire({
                icon: 'error',
                title: 'อุ๊ปส์...',
                text: 'กรุณาเลือกประเภทปัญหา',
            })
        } else {
            const data = {
                name: displayName, // ชื่อผู้ใช้
                detail: detail, // รายละเอียดปัญหา
                phone: phone.toString(), // เบอร์ติดต่อ
                type: typeSelect, // ประเภทปัญหา
                address: address, // ที่อยู่
                lat: lat, // ละติจูด
                lon: lon, // ลองติจูด
                imgStart: imageBase64, // รูปภาพเริ่มต้น
                imgEnd: 'NONE', // รูปภาพสิ้นสุด
                startDate_timeStamp: currentDate.unix(), // เวลาเริ่ม
                processDate_timeStamp: 0, // เวลากำลังดำเนินการ
                endDate_timeStamp: 0, // เวลาสิ้นสุด
                empProcess: 'NONE', // ผู้ดำเนินการ
                empEnd: 'NONE', // ผู้สิ้นสุด
                commentProcess: 'NONE', // ความคิดเห็นของผู้ดำเนินการ
                commentEnd: 'NONE', // ความคิดเห็นสิ้นสุด
                status: 0 // สถานะ
            }

            // try {
            //     Swal.showLoading()
            //     Axios.post("/task", data)
            //         .then((res) => {

                        axios.post("https://notify-api.line.me/api/notify", {
                            message: `มีคำร้องใหม่จาก ${displayName} ประเภท ${typeSelect} ที่ ${address} กรุณาดำเนินการ`,
                        }, {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Authorization": "Bearer EVb9MXEomIzpGRwQsBMuFDAfTnv3MhEDu7DPkFimwej"
                            },
                        }).then((result) => {
                            console.log(result);
                        }).catch((err) => {
                            console.log(err);
                        })

                    //     Swal.hideLoading()
                    //     Swal.fire({
                    //         title: 'แจ้งปัญหาเสร็จสิ้น!',
                    //         timer: 2000,
                    //         timerProgressBar: true,
                    //         didOpen: () => {
                    //             Swal.showLoading()
                    //             const b = Swal.getHtmlContainer().querySelector('b')
                    //         }
                    //     }).then((result) => {
                    //         router.reload();
                    //     })
                    // })
                // console.log(result);

            // } catch (error) {
            //     console.error(error);
            //     setErrors(error);
            // }
        }
    }

    return (
        <div>
            {/* <h1>{errors}</h1> */}
            <h1>{type.message}</h1>
            <div className="flex justify-center mt-2 ">
                <form onSubmit={((e) => handleSubmitForm(e))} className="text-gray-600 flex flex-col w-96">
                    <span>รายละเอียดปัญหา :</span>
                    <input onChange={(e) => setDetail(e.target.value)} className="my-2 drop-shadow-xl p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" type="text" name="detail" placeholder="กรอกรายละเอียด..." />
                    <span>เบอร์ติดต่อ :</span>
                    <input onChange={(e) => setPhone(e.target.value)} className="my-2 drop-shadow-xl p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" type="tel" name="phone" maxLength={10} placeholder="082XXXXXXX" required />
                    <span>ประเภท :</span>
                    <select defaultValue={'DEFAULT'} onChange={(e) => setTypeSelect(e.target.value)} className=" drop-shadow-xl my-2 p-2 border-2 rounded-xl border-gray-500 focus:outline-blue-500" id="cars" name="type" required>
                        <option value="DEFAULT" disabled hidden>โปรดเลือกประเภทปัญหา...</option>
                        {
                            typeData.map((item, key) => {
                                return (<option key={key} value={item.name}>{item.name}</option>)
                            }
                            )
                        }
                    </select>
                    <span>สถานที่ปัจจุบันของคุณ :</span>
                    <input disabled className="my-2 drop-shadow-xl bg-white p-2 border-2 rounded-xl border-gray-500" type="text" name="location" placeholder={address} />
                    <button className="drop-shadow-xl mb-8 text-white text-xl p-3 mt-2 rounded-lg border border-gray-500  bg-emerald-500" type="submit" >แจ้งปัญหา</button>
                </form>
            </div>
        </div>
    )
}
