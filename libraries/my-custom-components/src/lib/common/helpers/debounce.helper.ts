let timer: ReturnType<typeof setTimeout> | null = null;
export function debounce(callback: () => void, mills = 300) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    callback();
  }, mills);
}
