// URL must start with http or https and have a valid domain
export const isValidUrl = (url) => {
  const pattern = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;
  return pattern.test(url);
};

// Shortcode must be alphanumeric and 4–10 characters
export const isValidShortcode = (code) => {
  const pattern = /^[a-zA-Z0-9]{4,10}$/;
  return pattern.test(code);
};
