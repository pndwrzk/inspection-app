import axios from "axios";


const API_BASE_URL = process.env.NEXT_PUBLIC_INSPECTION_SERVICE;
const SECRET_API_KEY =process.env.NEXT_PUBLIC_SECRET_KEY;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "x-api-key": SECRET_API_KEY,
    },
});

apiClient.interceptors.request.use((config) => {
    const timestamp = Date.now().toString();
    const secretString = `${SECRET_API_KEY}:${timestamp}`;
    const secretKeyHeader = Buffer.from(secretString).toString("base64");
    config.headers["timestamp"] = timestamp;
    config.headers["secret-key"] = secretKeyHeader;
    
    return config;
});

export default apiClient;
