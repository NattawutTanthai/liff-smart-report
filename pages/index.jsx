import Header from "../components/Header";
import { useEffect, useState } from 'react'
import Form from "../components/Form";
import Camera from '../components/Camera';
import ImageProfile from "../components/ImageProfile";

export default function Home({type}) {
  const [profile, setProfile] = useState({})
  const [address, setAddress] = useState("")
  const [dataImage, setDataImage] = useState("")
  const [lat , setLat] = useState("")
  const [lon , setLon] = useState("")

  const setLocationState = async (lat, long) => {
    let apiUrl = "https://api.longdo.com/map/services/address?lon=" +
      long + "&lat=" + lat + "&key=" + process.env.LONGDO_API_KEY
    const res = await fetch(apiUrl, { cache: 'no-store' })
    const data = await res.json()
    const address_str = data.subdistrict + " " + data.district + " " + data.province
    setAddress(address_str)
  }

  const getLatAndLon = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
        setLocationState(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error(error)
      }
    )
  }

  useEffect(() => {
    getLatAndLon()
    import("@line/liff").then((liff) => {
      console.log("LIFF init...");
      liff
        .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
        .then(async () => {
          console.log("LIFF init succeeded.");
          if (!liff.isLoggedIn()) {
            liff.login()
          }
          const profile = await liff.getProfile()
          setProfile(profile)
        })
        .catch((error) => {
          console.log("LIFF init failed.");
        });
    });
  }, []);

  return (
    <div>
      <Header />
      <ImageProfile displayName={profile.displayName} pictureUrl={profile.pictureUrl} />
      <Camera dataImg={setDataImage} />
      <Form lat={lat} lon={lon} imageBase64={dataImage} displayName={profile.displayName} address={address} />
    </div>
  );
}




