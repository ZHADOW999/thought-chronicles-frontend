import { useState, useEffect } from 'react';
import axios from 'axios';
import NotFound from '../pages/404 page/404page';

const UseFetch = (url, search) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const params = search ? { search } : {}; // Add search as a query param if available

                // Log the final URL being fetched (for debugging)
                const finalUrl = search ? `${url}?search=${encodeURIComponent(search)}` : url;

                // Make the actual request to the backend
                const res = await axios.get(finalUrl, { params });

                if (res.status < 200 || res.status >= 300) {
                    throw new Error('Could not get data from that resource');
                }

                setData(res.data);
                setError(null);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        if (err.response.status === 422 ||404) {
                            setError(<NotFound />); // Return NotFound component for 404 errors
                        } else {
                            setError(`Error: ${err.response.status} - ${err.response.data.message || 'An error occurred'}`);
                        }
                    } else {
                        setError(`Network Error: ${err.message}`);
                    }
                } else {
                    setError(`An unexpected error occurred: ${err.message || 'An error occurred'}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, search]); // Re-fetch data when URL or search term changes

    return { data, loading, error };
};

export default UseFetch;
