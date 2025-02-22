import { createContext, useCallback, useEffect, useReducer, useState } from "react";
import { setRandomId } from "../helpers/setRandomId";

const UserDirectionContext = createContext();

const directionsSaved = JSON.parse(localStorage.getItem("userDirections"));

//direction example
// direction = {
//   directionId: null => the direction ID is asigned when the direction is saved.
//   directionName: null,
//   clientName: null,
//   clientLastname: null,
//   clientCI: null,
//   clientNumber: null,
//   country: null,
//   province: null,
//   city: null,
//   direction: null
// }

let directionInitialState = directionsSaved ? directionsSaved : [];

const directionTypes = {
  addDirection: "[ADD DIRECTION]",
  removeDirection: "[REMOVE DIRECTION]",
  updateDirection: "[UPDATE DIRECTION]",
};

const nameFormat = (name) => {
  return name
    .split(" ")
    .map((s) => s[0].toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");
};

const directionReducer = (state, action) => {
  switch (action.type) {
    case directionTypes.addDirection:
      return [...state, action.payload];
    case directionTypes.removeDirection:
      return state.filter((dir) => dir.directionId !== action.payload.directionId);
    case directionTypes.updateDirection:
      return state.map((dir) => (dir.directionId == action.payload.directionId ? action.payload : dir));
    default:
      return state;
  }
};

export const UserDirectionsProvider = ({ children }) => {
  const [userDirections, dispatch] = useReducer(directionReducer, directionInitialState);
  const [directionSelected, setDirectionSelected] = useState(null);

  const addDirection = (directionObject) => {
    if (!(typeof directionObject == "object") || Array.isArray(directionObject)) return console.warn("Solo se aceptan objetos");

    let directionId = setRandomId();
    directionObject.directionId = directionId;

    const action = {
      type: directionTypes.addDirection,
      payload: directionObject,
    };

    dispatch(action);
  };

  const updateDirection = (directionObject) => {
    if (!(typeof directionObject == "object") || Array.isArray(directionObject)) return console.warn("Solo se aceptan objetos");

    //update string values of directionObject to Pascal Case.
    for (let prop in directionObject) {
      if (typeof directionObject[prop] !== "string") return;
      directionObject[prop] = nameFormat(directionObject[prop]);
    }

    const action = {
      type: directionTypes.updateDirection,
      payload: directionObject,
    };

    dispatch(action);
  };

  const deleteDirection = (directionObject) => {
    if (!(typeof directionObject == "object") || Array.isArray(directionObject)) return console.warn("Solo se aceptan objetos");

    const action = {
      type: directionTypes.removeDirection,
      payload: directionObject,
    };

    dispatch(action);
  };

  const selectDirection = (directionObject) => {
    if (!(typeof directionObject == "object") || Array.isArray(directionObject)) return console.warn("Solo se aceptan objetos");

    setDirectionSelected(directionObject);
  };

  useEffect(() => {
    localStorage.setItem("userDirections", JSON.stringify(userDirections));
  }, [userDirections]);

  return <UserDirectionContext.Provider value={{ addDirection, deleteDirection, directionSelected, selectDirection, updateDirection, userDirections }}>{children}</UserDirectionContext.Provider>;
};

export { UserDirectionContext };
