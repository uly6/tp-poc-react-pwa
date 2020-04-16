import * as EXIF from 'exif-js';

function convertDMSToDD(degrees, minutes, seconds, direction) {
  let dd = degrees + minutes / 60 + seconds / 3600;
  if (direction === 'S' || direction === 'W') {
    dd = dd * -1;
  }
  return dd;
}

export function getGeolocation(tags) {
  const {
    GPSLatitude,
    GPSLatitudeRef,
    GPSLongitude,
    GPSLongitudeRef,
  } = tags;

  if (
    !GPSLatitude ||
    !GPSLatitudeRef ||
    !GPSLongitude ||
    !GPSLongitudeRef
  ) {
    return null;
  }

  const latDegree = GPSLatitude[0];
  const latMinute = GPSLatitude[1];
  const latSecond = GPSLatitude[2];
  const latDirection = GPSLatitudeRef;

  const lonDegree = GPSLongitude[0];
  const lonMinute = GPSLongitude[1];
  const lonSecond = GPSLongitude[2];
  const lonDirection = GPSLongitudeRef;

  const lat = convertDMSToDD(
    latDegree,
    latMinute,
    latSecond,
    latDirection,
  );

  const lng = convertDMSToDD(
    lonDegree,
    lonMinute,
    lonSecond,
    lonDirection,
  );

  return {
    lat,
    lng,
  };
}

export function getGeolocationFromImage(imageFile) {
  return new Promise((resolve, reject) => {
    EXIF.getData(imageFile, function () {
      const allMetaData = EXIF.getAllTags(this);
      console.log('==>> EXIF ALL', allMetaData);
      resolve(getGeolocation(allMetaData));
    });
  });
}
