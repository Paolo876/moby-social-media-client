import { useState } from 'react';
import axios from 'axios'


/* @desc       A set of request functions for Settings (No redux)
*  @access     Private
*/
const useSettingsActions = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);


 /*  @desc       save changes to settings
  *  @access     Private
  *  @return     <Object> --{}
  */
  const updateSettings = async (data) => {
    setIsLoading(true)
    try {
        const res = await axios.put(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/update-profile`, data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError(err.message)
    }
  }


  return { isLoading, error, updateSettings }
}

export default useSettingsActions