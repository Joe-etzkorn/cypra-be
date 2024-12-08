export const inviteUserTemplate = (firstName: string, invitedLink: string, companyName: string) => {
  return `
    Hello ${firstName},

    You have been invited by ${companyName} to create an account on our platform.

    Please click the link below to proceed with your registration:
    ${invitedLink}

    If you have any questions, please don't hesitate to contact us.

    Best regards,
    ${companyName} Team
  `;
};