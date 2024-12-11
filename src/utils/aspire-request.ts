import { Message } from '../enums/message.enum';

type HttpMethod = 'GET' | 'POST' | 'PUT';

interface RequestBody {
  [key: string]: any; // This represents any object as the body
}

const sendAspireRequest = async (
  method: HttpMethod,
  endpoint: string,
  body: RequestBody | null = null,
  token?: string,
) => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      headers,
      method,
    };

    // If the method is POST or PUT, add the body to the request
    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(
      `${process.env.ASPIRE_API_URL}${endpoint}`,
      options,
    );

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
