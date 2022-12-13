import Header from "../components/Header";
import { useEffect, useState } from 'react'
import Form from "../components/Form";
export default function Home() {
  const [profile, setProfile] = useState({})
  useEffect(() => {
    // to avoid `window is not defined` error
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
          console.log("profile=", profile)
          // setLiffObject(liff);
        })
        .catch((error) => {
          console.log("LIFF init failed.");
          // setLiffError(error.toString());
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

// export async function getStaticProps({ liff, liffError }) {
//   console.log("liff=>", liff)
//   // const profile = await liff.getProfile()
//   // setProfile(profile)
//   // console.log("profile=", profile)
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }


