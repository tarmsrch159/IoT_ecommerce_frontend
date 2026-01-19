
export const headersConfig = (token, contentType) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": contentType || "application/json"
        }
    }
    return config
}