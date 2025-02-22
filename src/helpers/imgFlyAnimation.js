//fly product img to the cart icon

export const imgFlyAnimation = (e) => {
  if (!document.querySelector(`.imgFlyHere`)) return; //if don't get the cart icon reference, return.

  // select the img of the product for clone, and select the img container for append the img cloned.
  const mainImg = e.target.closest(`.card`).querySelector(`.cardImg`);
  const clonedImg = mainImg.cloneNode(true);
  const clonedImgContainer = document.createElement("div");
  const mainImgRect = mainImg.getBoundingClientRect();

  //img container and img cloned initial styles
  clonedImg.style.cssText = `
  width: 100%;
  height: 100%;
  transition: 1.5s ease-out;
  `;

  clonedImgContainer.style.cssText = `
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 1s ease-out;
  z-index: 999;
  width: ${mainImgRect.width}px;
  height: ${mainImgRect.height}px;
  top: ${mainImgRect.y}px;
  left: ${mainImgRect.x}px;
  `;

  clonedImgContainer.appendChild(clonedImg);

  document.querySelector("#root").appendChild(clonedImgContainer); //append the cloned img

  //get the cart icon coords.
  const cartIconRect = document.querySelector(`.imgFlyHere`).getBoundingClientRect();

  //From the cartIcon X you have to substract the 50% of the img width to centrate with cart icon. The same with the height

  //Translate the cloned img container to the cart icon position.
  clonedImgContainer.style.left = `${cartIconRect.x + cartIconRect.width / 2 - mainImgRect.width / 2}px`;
  clonedImgContainer.style.top = `${cartIconRect.y + cartIconRect.height / 2 - mainImgRect.height / 2}px`;
  clonedImgContainer.style.opacity = 0;
  clonedImg.style.width = "0";
  clonedImg.style.height = "0";

  //remove imgcontainer element from the body
  setTimeout(() => {
    document.querySelector("#root").removeChild(clonedImgContainer);
  }, 2000);
};
