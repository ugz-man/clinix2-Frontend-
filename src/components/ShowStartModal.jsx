import { useEffect } from "react";
import Modal from "./Modal";
import ShowInfoForm from "./ShowInfoForm";
import { wakeServer } from "../services/apiMessages";

function ShowStartModal() {
  // Since the backend is running on Render on a free instance
  // and Render will always shut it down after some moment of inactivity
  // this useEffect hits the backend server once this component mounts so as to start it up
  useEffect(function () {
    wakeServer();
  }, []);

  return (
    <Modal>
      <Modal.Open opens="info-form" openByDefault={true}>
        <h1>show</h1>
      </Modal.Open>
      <Modal.Window name="info-form">
        <ShowInfoForm />
      </Modal.Window>
    </Modal>
  );
}

export default ShowStartModal;
