import { useContext } from "react";
import { FormAdress } from "../../FormAdress";
import { DirectionsCardList } from "../../User/UserDirections/DirectionsCardList";
import { UserDirectionContext } from "../../../contexts/UserDirectionsContext";
import { CheckoutContext } from "../../../contexts/CheckoutContext";

export const SelectDirection = () => {
  const { userDirections } = useContext(UserDirectionContext);
  const { updateShipping } = useContext(CheckoutContext);

  const onSelectDirection = (direction) => {
    updateShipping(direction);
  };

  return userDirections.length == 0 ? <FormAdress mode="checkout" /> : <DirectionsCardList mode="checkout" onSelectDirection={onSelectDirection} />;
};
