import { useState } from 'react';
import axios from 'axios'


/* @desc       A set of request functions for Settings (No redux)
*  @access     Private
*/
const useSettingsActions = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);


 /*  @desc       save changes to settings
  *  @access     Private
  *  @return     <Object> --{}
  */
  const updateSettings = async (data) => {
    setIsLoading(true)
    setError(null)
    try {
        const res = await axios.put(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/update-settings`, data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        setSuccess("User profile updated!")
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }


 /*  @desc       update profile picture
  *  @access     Private
  *  @return     <Object> --{}
  */
  const updateProfilePicture = async (data) => {
    setIsLoading(true)
    setError(null)
    try {
        const res = await axios.put(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/update-profile-picture`, data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        setSuccess("Profile picture updated!")
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }


  return { isLoading, error, updateSettings, updateProfilePicture, success }
}

export default useSettingsActions