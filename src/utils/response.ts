import { Response } from 'express';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
};

/**
 * Sends a standardized API response.
 *
 * @param res - Express response object
 * @param statusCode - HTTP status code
 * @param success - Indicates whether the operation was successful
 * @param message - Response message
 * @param data - Optional response data
 * @param error - Optional error details
 */
export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T,
  error?: any,
): Response<ApiResponse<T>> => {
  return res.status(statusCode).json({
    status: statusCode,
    success,
    message,
    ...(data && { data }),
    ...(error && { error }),
  });
};
