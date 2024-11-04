import { useState } from "react";
import Cookies from "js-cookie";

function useCookie(name, defaultValue) {
  const [cookieValue, setCookieValue] = useState(() => {
    return Cookies.get(name) || defaultValue;
  });

  const updateCookie = (value, options) => {
    Cookies.set(name, value, options);
    setCookieValue(value);
  };

  const deleteCookie = () => {
    Cookies.remove(name);
    setCookieValue(null);
  };

  return [cookieValue, updateCookie, deleteCookie];
}

export default useCookie;
