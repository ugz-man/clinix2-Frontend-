import {
  HiOutlinePaperAirplane as HiOutlinePaperAirplaneIcon,
  HiOutlinePhoto as HiOutlinePhotoIcon,
  HiOutlineXCircle as HiOutlineXCircleIcon,
} from "react-icons/hi2";

export function HiOutlinePaperAirplane() {
  return <HiOutlinePaperAirplaneIcon />;
}

export function HiOutlinePhoto() {
  return <HiOutlinePhotoIcon />;
}

export function HiOutlineXCircle({ className }) {
  return <HiOutlineXCircleIcon className={className} />;
}
