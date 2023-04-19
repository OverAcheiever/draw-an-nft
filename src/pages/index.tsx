import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Upload } from "upload-js";
import openai from "openai";
import { api } from "@/utils/api";

const upload = Upload({
  apiKey: "public_FW25bEJ7ui1TUNcbksHrpcwoDHqA",
});

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const webcam = useRef(null);

  const { mutate, data } = api.upload.upload.useMutation({
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setIsLoading(false);
    },
  });

  console.log(data);

  const capture = useCallback(async () => {
    // @ts-ignore
    const image = webcam.current.getScreenshot();

    !image ? console.log("No image") : null;

    setIsLoading(true);

    const { fileUrl } = await upload.uploadFile(
      await (await fetch(image)).blob(),
      {
        path: { folderPath: "/draw-an-nft" },
      }
    );

    mutate({
      image: fileUrl,
    });
  }, [webcam]);

  console.log(data?.image);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black font-space text-white outline outline-1 outline-offset-1 outline-white">
      <div className="flex max-w-screen-sm flex-col items-center px-5 lg:px-0">
        {isLoading ? (
          "Loading..."
        ) : !data ? (
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
            <img src={data.image} className="h-full w-full rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
