import Header from "../components/Header";
import { useEffect, useState } from 'react'
import Form from "../components/Form";
export default function Home({ data }) {
  const [profile, setProfile] = useState({})
  const [latAndLon, setLatAndLon] = useState("")
  const [location, setLocation] = useState({})


  const setLocationState = async () => {
    let apiUrl = "https://api.longdo.com/map/services/address?lon=" +
      latAndLon.longitude + "&lat=" + latAndLon.latitude + "&key=" + process.env.LONGDO_API_KEY
    const res = await fetch(apiUrl, { cache: 'no-store' })
    const data = await res.json()
    setLocation(data)
    console.log("location = ", data);
  }

  const getLatAndLon = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatAndLon({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      },
      (error) => {
        console.error(error)
      }
    )
  }


  useEffect(() => {
    getLatAndLon()
    setLocationState()

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
      <Form displayName={profile.displayName} pictureUrl={profile.pictureUrl} />
    </div>
  );
}



