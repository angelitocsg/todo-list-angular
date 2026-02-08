export function debounce(callback: () => void, mills = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, mills);
  };
}

