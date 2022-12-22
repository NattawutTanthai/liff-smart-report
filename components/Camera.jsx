import Webcam from "react-webcam";
import { useState, useRef } from 'react'
import Image from 'next/image'

function Camera() {
    const FACING_MODE_USER = "user";
    const FACING_MODE_ENVIRONMENT = "environment";
    const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

    const videoConstraints = {
        facingMode: FACING_MODE_ENVIRONMENT
    };

    const handleClick = () => {
        console.log("click");
        setFacingMode(
            prevState =>
                prevState === FACING_MODE_USER
                    ? FACING_MODE_ENVIRONMENT
                    : FACING_MODE_USER
        );
    };

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }
    return (
        <>
            <div className=' flex flex-col justify-center mt-10 p-3'>
                <button className='border-2 m-2 border-red-400' onClick={handleClick}>Switch camera</button>
                <button className='border-2 m-2 border-red-400' onClick={capture}>Capture</button>
                <Webcam
                    audio={false}
                    width={400}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                        ...videoConstraints,
                        facingMode
                    }}
                />
            {imgSrc && (
                <div className="mt-3">
                <Image
                    width={400}
                    height={400}
                    src={imgSrc}
                    alt="Picture"
                />
                </div>
            )}
            </div>
        </>
    )
}

export default Camera