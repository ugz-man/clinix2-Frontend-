import { HiOutlinePhoto } from "./Icons";
import Modal from "./Modal";
import UploadImageView from "./UploadImageView";

function UploadImageButton() {
  function uploadImage(e) {
    e.preventDefault();
  }

  return (
    <Modal>
      <Modal.Open opens="upload-image-form">
        <button
          type="button"
          onClick={uploadImage}
          className="bg-primary-500 dark:bg-dark-primary-700 focus:ring-primary-500 hover:bg-primary-400 cursor-pointer rounded-full border-none p-4 text-white transition-all duration-300 focus:ring focus:ring-offset-2 focus:outline-none"
        >
          <HiOutlinePhoto />
          {/* sen */}
        </button>
      </Modal.Open>
      <Modal.Window name="upload-image-form" showCloseButton="true">
       <UploadImageView />
      </Modal.Window>
    </Modal>
  );
}

export default UploadImageButton;
