export const getImageSize = (
  url: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
  });
};

// export const parsePhotosForDisplay = async (
//   photos: photos
// ): Promise<photosDisplay> => {
//   const photosWithSizes = await Promise.all(
//     photos.map(async (photo) => {
//       const { width, height } = await getImageSize(photo.content);
//       return {
//         src: photo.content,
//         width,
//         height,
//         // title: photo.title,
//         // description: photo.description,
//       };
//     })
//   );
//   return photosWithSizes;
// };
