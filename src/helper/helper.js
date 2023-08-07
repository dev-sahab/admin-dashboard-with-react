export const timeago = (date) => {
  const now = new Date();
  const timeDiffInSeconds = Math.floor((now - new Date(date)) / 1000);

  if (timeDiffInSeconds < 60) {
    return `${timeDiffInSeconds} second${
      timeDiffInSeconds !== 1 ? "s" : ""
    } ago`;
  } else if (timeDiffInSeconds < 3600) {
    const minutes = Math.floor(timeDiffInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (timeDiffInSeconds < 86400) {
    const hours = Math.floor(timeDiffInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (timeDiffInSeconds < 2592000) {
    const days = Math.floor(timeDiffInSeconds / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (timeDiffInSeconds < 31536000) {
    const months = Math.floor(timeDiffInSeconds / 2592000);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(timeDiffInSeconds / 31536000);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
};


// random password generator
export const generateRandomPassword = (length = 12) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|;:,.<>?";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

