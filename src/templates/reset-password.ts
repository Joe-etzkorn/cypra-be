export const resetPasswordTemplate = (
  firstName: string,
  resetPasswordLink: string,
) => {
  return `
    Hello ${firstName},

    You have requested to reset your password. Please click the link below to reset your password:

    ${resetPasswordLink}

    This link will expire in 1 hour.

    If you did not request this, please ignore this email.

    Best regards,
    Support Team
  `;
};
