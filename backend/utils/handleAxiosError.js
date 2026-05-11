const handleAxiosError = (error) => {

    //Axios error
    if (error.isAxiosError) {

        //Server responded (4xx, 5xx)
        if (error.response) {
            const status = error.response.status;
            console.log("server replied with error")

            if (status === 400) return {message:"Bad request ❌",status:status};
            if (status === 401) return {message:"Invalid API key 🔑",status:status};
            if (status === 403) return {message:"Access forbidden 🚫",status:status};
            if (status === 404) return {message:"API route not found ❌",status:status};
            if (status === 429) return {message:"Too many requests 🚫",status:status};
            if (status >= 500) return {message:"Server error ⚠️",status:status};

            return {message:"Something went wrong with API"};
        }

        //No response (network issue)
        if (error.request) {
            console.log("no response received")
            return {message:"Network error "};
        }
    }

    //Non-axios error
    return {message:error.message || "Unknown error"};
};

export default handleAxiosError;