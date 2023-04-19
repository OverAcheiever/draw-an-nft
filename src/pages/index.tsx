import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Upload } from "upload-js";

const Home = () => {
  const [image, setImage] = useState<string>();

  const webcam = useRef(null);

  const capture = useCallback(async () => {
    // @ts-ignore
    const image = webcam.current.getScreenshot();

    !image ? console.log("No image") : setImage(image);

    const upload = Upload({
      apiKey: "public_FW25bEJ7ui1TUNcbksHrpcwoDHqA",
    });

    const { fileUrl } = await upload.uploadFile(
      await (await fetch(image)).blob()
    );

      axios
      .post("https://stablediffusionapi.com/api/v5/pix2pix", {
        key: "GkTrr60EN0X5XTZHAa9av56a750QJMp6SNBzBNSfrvPyITELZkWvvAz4LuTb",
        prompt: "digital art",
        init_image: fileUrl,
      })
      .then((res) => {
        console.log(res);
      });
  }, [webcam]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black font-space text-white outline outline-1 outline-offset-1 outline-white">
      <div className="flex max-w-screen-sm flex-col items-center">
        {!image ? (
          <>
            <Webcam
              className="rounded-lg"
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: {
                  ideal: "environment",
                },
              }}
              width={512}
              height={512}
              ref={webcam}
              screenshotQuality={1}
            />
            <button
              className="mt-5 h-12 w-max rounded bg-white px-5 text-black"
              onClick={capture}
            >
              capture
            </button>
          </>
        ) : (
          <div>
            <img src={image} alt="" className="rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
