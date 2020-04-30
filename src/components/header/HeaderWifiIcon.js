import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import React, { useEffect, useState } from 'react';

const REST_API_URL = process.env.REACT_APP_REST_API_ENDPOINT;

export const HeaderWifiIcon = () => {
    const [isOnline, setIsOnline] = useState();

    useEffect(() => {
        window.addEventListener('online', checkInternet);
        window.addEventListener('offline', checkInternet);
        checkInternet();
    },[])

    const checkInternet = () => {
        if (navigator.onLine) {
            fetch(`${REST_API_URL}/orders`, {method: 'HEAD', mode: 'no-cors'}).then(function (resp) {
                setIsOnline(resp && (resp.ok || resp.type === 'opaque') ? true : false)
            }).catch(e => {
                setIsOnline(false)
            });
        } else {
            // handle offline status
            setIsOnline(false)
        }
    }
    return isOnline ? <WifiIcon/> : <WifiOffIcon/>
}
