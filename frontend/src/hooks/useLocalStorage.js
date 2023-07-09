import { useState, useCallback, useEffect } from "react";

const customEvent = "myMagicalStorageHook";

export default function useLocalStorage(
  key,
  initialValue,
  lifeSpan = Infinity
) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      const stampedValue = JSON.parse(item);
      const JSONValue =
        stampedValue &&
        stampedValue.expire > Date.now() &&
        JSON.parse(stampedValue.JSONValue);

      return JSONValue || initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const expire = Date.now() + lifeSpan;
        const JSONValue = JSON.stringify(value);
        const stampedValue = { expire, JSONValue };

        window.dispatchEvent(
          new CustomEvent(customEvent, { detail: { key, value } })
        );

        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(stampedValue));
      } catch (error) {
        console.log(error);
      }
    },
    [key, lifeSpan]
  );

  useEffect(() => {
    const listener = window.addEventListener(customEvent, (event) => {
      const keyMatch = event.detail.key === key;
      const newValue = event.detail.value !== storedValue;
      if (keyMatch && newValue) {
        setStoredValue(event.detail.value);
      }
    });

    return window.removeEventListener(customEvent, listener);
  }, [key, storedValue]);

  return [storedValue, setValue];
}
