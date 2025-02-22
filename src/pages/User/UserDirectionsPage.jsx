import { useLocation } from "react-router-dom";
import { UserDirections } from "../../components/User/UserDirections";
import { UserDirectionEditPage } from "./UserDirectionEditPage";

export const UserDirectionsPage = () => {
  const location = useLocation();
  const directionId = new URLSearchParams(location.search).get("direction_id");

  return directionId ? <UserDirectionEditPage /> : <UserDirections />;
};
