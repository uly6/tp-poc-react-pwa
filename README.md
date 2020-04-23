## Demo

[https://uly6.github.io/tp-poc-react-pwa/](https://uly6.github.io/tp-poc-react-pwa/)


[PouchDB-server Fauxton](https://tp-poc-pouchdb-server.herokuapp.com/_utils/)

## Run locally

Edit the `package.json` homepage to `/`


## Apple remove EXIF info when uploading from Safari mobile

### Refs

[https://apple.stackexchange.com/questions/326789/gps-exif-from-iphone-photo-upload-in-safari](https://apple.stackexchange.com/questions/326789/gps-exif-from-iphone-photo-upload-in-safari)

[https://stackoverflow.com/questions/57942150/file-upload-and-exif-in-mobile-safari](https://stackoverflow.com/questions/57942150/file-upload-and-exif-in-mobile-safari)

[https://www.flickr.com/help/forum/en-us/72157700799502582/](https://www.flickr.com/help/forum/en-us/72157700799502582/)

### Work around

On iPhone camera settings ( Settings > Camera > Formats ) there are two possible formats `High Efficiency` and `Most Compatible`.

`High Efficiency` is selected by default.

#### High Efficiency selected

There is no GPS info, doesn't matter if you take directly the picture or upload from Photo Library.

#### Most Compatible selected

There is no GPS info if you take the picture directly in the web app.

If you take the picture, and then upload selecting from Photo Library the GPS coordinates are there only if you upload the `actual size`, if you reduce the size the GPS info is striped from the file.