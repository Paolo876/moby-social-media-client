import { useState } from 'react'
import axios from 'axios'

const useImagekit = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  

 /*  @desc       get authenticationEndpoint object --must be fetched on new page mount to generate a new token.
  *  @access     Private
  *  @return     <Object>{ signature, token, expire }
  */
  const getAuthenticationEndpoint = async () => {
    setIsLoading(true)
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/imagekit/`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError(err.message)
    }
  }
  

 /*  @desc       upload image
  *  @access     Private
  *  @return     <Object>
  */
  const uploadImage = async ({ authenticationEndpoint, file, fileName, folder, useUniqueFileName=true }) => {
    setIsLoading(true)
    try {
        const res = await axios.post("https://upload.imagekit.io/api/v1/files/upload", {
            file,
            publicKey: process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY,
            signature: authenticationEndpoint.signature,
            expire: authenticationEndpoint.expire,
            token: authenticationEndpoint.token,
            fileName,
            folder,
            useUniqueFileName
          }, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        setIsLoading(false)
        return res.data
    } catch(err) {
        setIsLoading(false)
        if(err.response.status === 400){
            setError("An Error occurred, please refresh the page and try again.")
        } else {
            setError(err.message)
        }
    }
  }


  return { isLoading, error, getAuthenticationEndpoint, uploadImage }
}

export default useImagekit;