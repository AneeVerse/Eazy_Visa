import { useState, useEffect } from 'react';

const useGeoLocation = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchGeo = async () => {
            try {
                // ipapi.co provides HTTPS and doesn't require a key for small volumes
                const response = await fetch('https://ipapi.co/json/');
                // #region agent log
                fetch('http://127.0.0.1:7491/ingest/fb119253-f691-4d99-ba02-d8d9a057580b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c40d58'},body:JSON.stringify({sessionId:'c40d58',location:'useGeoLocation.js:fetchGeo',message:'geo fetch response',data:{ok:response.ok,status:response.status},timestamp:Date.now(),hypothesisId:'A'})}).catch(()=>{});
                // #endregion
                if (!response.ok) return;
                const data = await response.json();
                setLocation({
                    city: data.city,
                    region: data.region,
                    pincode: data.postal,
                    country: data.country_name,
                    ip: data.ip
                });
                // #region agent log
                fetch('http://127.0.0.1:7491/ingest/fb119253-f691-4d99-ba02-d8d9a057580b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c40d58'},body:JSON.stringify({sessionId:'c40d58',location:'useGeoLocation.js:fetchGeo',message:'geo fetch success',data:{hasCity:!!data.city,hasIp:!!data.ip},timestamp:Date.now(),hypothesisId:'A'})}).catch(()=>{});
                // #endregion
            } catch (err) {
                console.error("Geo fetch failed:", err);
                // #region agent log
                fetch('http://127.0.0.1:7491/ingest/fb119253-f691-4d99-ba02-d8d9a057580b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c40d58'},body:JSON.stringify({sessionId:'c40d58',location:'useGeoLocation.js:fetchGeo',message:'geo fetch failed',data:{errorName:err?.name,errorMessage:err?.message},timestamp:Date.now(),hypothesisId:'A'})}).catch(()=>{});
                // #endregion
            }
        };
        fetchGeo();
    }, []);

    return location;
};

export default useGeoLocation;
