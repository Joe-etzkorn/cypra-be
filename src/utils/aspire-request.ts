import { Message } from "../enums/message.enum";

const sendAspireRequest = async (method: string, endpoint: string, body: object) => {
    try {
      const res = await fetch(`${process.env.ASPIRE_API_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method,
        body: JSON.stringify(body),
      });
  
      if (!res.ok) {
        const error = await res.json();
        throw error;
      }
      return res.json();
    } catch (error) {
      console.error('Error in Aspire request:', error);
      throw new Error(Message.INVALID_CREDENTIALS);
    }
  };

export default sendAspireRequest;