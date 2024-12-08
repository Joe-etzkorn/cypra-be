export const getStartedTemplate = (
    requestInfo: {
      name: string,
      email: string,
      company: string,
      phone?: string,
      comment?: string
    }
  ) => {
    return `
      Hello Mr/Mrs,
  
      You have received a new account creation request with the following details:
  
      Name: ${requestInfo.name}
      Email: ${requestInfo.email}
      Company: ${requestInfo.company}
      Phone: ${requestInfo.phone}
      Comment: ${requestInfo.comment}
  
      Please review this request and take appropriate action.
  
      Best regards,
      System
    `;
  };