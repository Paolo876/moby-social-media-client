import { IKImage } from 'imagekitio-react';

const Image = ({ src, transformation, style }) => {
  return (
    <IKImage 
        src={src} 
        urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}
        transformation={transformation} 
        style={style}
    />
  )
}

export default Image