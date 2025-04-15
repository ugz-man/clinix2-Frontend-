import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { HiOutlinePaperAirplane } from "./Icons";
import { uploadImageToServer } from "../services/apiMessages";
import CircularLoadingSpinner from "./CircularLoadingSpinner";

function UploadImageView({ onCloseModal }) {
  const hiddenFileInput = useRef(null);
  const previewImageView = useRef(null);

  const { isPending, mutate: uploadImage } = useMutation({
    mutationFn: uploadImageToServer,
  });

  useEffect(
    function () {
      if (!hiddenFileInput) return;

      hiddenFileInput.current.click();
    },
    [hiddenFileInput],
  );

  function handleonChange(e) {
    const files = e.target.files;

    if (!files || files.length === 0) {
      onCloseModal();
    }

    const imageFile = files[0];

    previewImage(imageFile);
  }

  function previewImage(imageFile) {
    const reader = new FileReader();

    // After reading the file set the src of the img tag where we preview the image
    reader.onload = async function (event) {
      previewImageView.current.src = event.target.result;

      uploadImage(imageFile);
    };
    reader.onerror = function () {
      toast.custom(() => (
        <div
          className={`dark:bg-dark-background-100 bg-white px-6 py-4 shadow-md`}
        >
          ❌ {"Couldn't load image"}
        </div>
      ));
    };
    // Read the image file in the background and convert the file to a dataUrl
    // as the img tag can't read a file as it is, so we need a url
    // using the FileReader browser API
    reader.readAsDataURL(imageFile);
  }

  function sendImageWithText() {
    onCloseModal();
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-center border-2 border-dashed">
        <img className="aspect-square max-h-96" ref={previewImageView} />
      </div>

      <div className="flex items-center gap-2">
        <textarea
          type="text"
          // ref={textAreaElement}
          className="chat-input border-grey-300 focus:ring-grey-300 focus:outline-grey-300 grow border p-2 md:text-lg dark:text-white"
          required
          placeholder="Meesage"
          //   value={textMessage}
          // onChange={handleTextAreaOnChange}
        />

        <button
          onClick={sendImageWithText}
          disabled={isPending}
          className="bg-primary-500 dark:bg-dark-primary-700 focus:ring-primary-500 hover:bg-primary-400 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none p-4 text-white transition-colors duration-300 focus:ring focus:ring-offset-2 focus:outline-none"
        >
          {isPending ? <CircularLoadingSpinner /> : <HiOutlinePaperAirplane />}
        </button>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleonChange}
          ref={hiddenFileInput}
        />
      </div>
    </>
  );
}

export default UploadImageView;
