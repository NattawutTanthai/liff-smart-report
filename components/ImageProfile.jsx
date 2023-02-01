import Image from 'next/image'
function ImageProfile({ pictureUrl, displayName}) {
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
            <div className="text-[#636466] flex justify-center">ชื่อ : {displayName}</div>
        </div>
    )
}

export default ImageProfile