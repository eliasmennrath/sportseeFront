import { useCallback, useEffect, useState } from "react"; 

import {
    USER_MAIN_DATA,
    USER_ACTIVITY,
    USER_AVERAGE_SESSIONS,
    USER_PERFORMANCE
} from "../data.js";

export default function useFetch(url) {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)

    const request = useCallback(async () => {
        setLoading(true);

        // Set REACT_APP_PROD variable to true in .env to use production data
        if(!process.env.REACT_APP_PROD) {
            const dataType = url.substring(url.lastIndexOf('/') + 1);
            switch (dataType) {
                case 'average-sessions':
                    setData({data :USER_AVERAGE_SESSIONS[0]});
                    break;
                
                case 'performance':
                    setData({data :USER_PERFORMANCE[0]});
                    break;

                case 'activity':
                    setData({data :USER_ACTIVITY[0]});
                    break;

                default:
                    setData({data :USER_MAIN_DATA[0]});
                    break;
            }
            setLoading(false);
        } else {
            try {
                const data = await fetch(url);
                if (!data.ok) {
                    throw new Error(data.statusText);
                }
                const result = await data.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    }, [url]);

    useEffect(() => {
        request()
    }, [request])

    return {
        loading,
        data,
        error
    };
} 