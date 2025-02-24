export const getDirectImgURL = (driveUrl) => {
  const fileId = driveUrl.match(/\/d\/(.+)\/v.*/)[1];

  const directUrl = `https://lh3.googleusercontent.com/d/${fileId}=s500`;

  return directUrl;
};
