import Webcam from "react-webcam";
import { useState, useRef } from 'react'
import Image from 'next/image'

function Camera(props) {
    const FACING_MODE_USER = "user";
    const FACING_MODE_ENVIRONMENT = "environment";
    const webcamRef = useRef(null);
    const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
    const [imgSrc, setImgSrc] = useState(null);
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

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        props.dataImg(imageSrc);
    }
    return (
        <>
            <div className=' flex flex-col justify-center mt-10 p-3'>
                <div className="flex flex-row">
                    {imgSrc == null ?
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
                        :
                        <div className="mt-3">
                            <Image
                                width={400}
                                height={400}
                                src={imgSrc}
                                alt="Picture"
                            />
                        </div>
                    }

                </div>
                <div className="flex flex-row">
                    {imgSrc == null ?
                        <button className=' rounded-md w-full border-2 m-2 border-gray-400 bg-sky-300' onClick={capture}>?????????????????????</button>
                        :
                        <button className=' rounded-md w-full border-2 m-2 border-gray-400 bg-sky-300' onClick={() => setImgSrc(null)}>?????????????????????????????????</button>
                    }
                    <button className='p-3 rounded-md border-2 m-2 border-gray-400 bg-sky-300' onClick={handleClick}>
                        <span className="material-icons-two-tone ">cameraswitch</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Camera