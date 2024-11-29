import axios from "axios";
import { useEffect, useState } from "react";
const UseFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(url)
                .then(res => {
                    // Check if the response status is not in the 200 range
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Could not get data from that resource');
                    }
                    setData(res.data);
                    setError(null)
                    setLoading(false)
                    //console.log(res.data)
                })
                .catch(err => {
                    // Check if the error is an Axios error
                    if (axios.isAxiosError(err)) {
                        console.error('Axios error:', err.message);
                        // Optionally, check for response status codes
                        if (err.response) {
                            console.error('Response status:', err.response.status);
                            console.error('Response data:', err.response.data);
                            setError(`Error: ${err.response.status} - ${err.response.data.message || 'An error occurred'}`);
                        } else {
                            setError(err.message);
                        }
                    } else {
                        console.error('Unexpected error:', err);
                        setError('An unexpected error occurred');
                    }
                    setLoading(false)
                });

    }, [url]);
    return {data,loading,error}
}

export default UseFetch;