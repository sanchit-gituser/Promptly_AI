import 'dotenv/config';
import axios from 'axios';
import handleAxiosError from './handleAxiosError.js';
import ExpressError from './ExpressError.js';



const getData=async(prompt)=>{
    try {
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            },
            {   //CONFIG
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": process.env.GEMINI_API_KEY
                }
            }
        );
        return (response.data.candidates[0].content.parts[0].text)
    } catch (error) {
        let {message,status}=handleAxiosError(error)
        throw new ExpressError(message,status);
    }
};


export default getData;

