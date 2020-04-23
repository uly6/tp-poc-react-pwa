import * as EXIF from 'exif-js';

function convertDMSToDD(degrees, minutes, seconds, direction) {
  let dd = degrees + minutes / 60 + seconds / 3600;
  if (direction === 'S' || direction === 'W') {
    dd = dd * -1;
  }
  return dd;
}

function parseGeolocationTags(tags) {
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
    origin: 'EXIF',
  };
}

export const getGeolocationFromImage = (imageFile) => {
  return new Promise((resolve, reject) => {
    EXIF.getData(imageFile, function () {
      const allMetaData = EXIF.getAllTags(this);
      console.log('==>> EXIF ALL', allMetaData);
      resolve(parseGeolocationTags(allMetaData));
    });
  });
};

export const getGeoloacationFromDevice = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // success
        (position) => {
          console.log(position);
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            origin: 'DEVICE',
          });
        },
        // error
        (err) => {
          // reject(err);
          resolve(null);
          // error.code can be:
          //   0: unknown error
          //   1: permission denied
          //   2: position unavailable (error response from location provider)
          //   3: timed out
        },
        // options
        {
          timeout: 10000,
          // enableHighAccuracy: true, // slower to resolve and uses more battery
        },
      );
    } else {
      console.log(
        'Geolocation is not supported for this Browser/OS.',
      );
      reject();
    }
  });
};
