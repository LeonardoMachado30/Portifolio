/**
 * Call function deplay debounce
 *
 * @param func function call debounce
 * @param delay delay function call debounce
 */
export default function debounce(func: Function, delay: number) {
  let timeoutId: any;
  return function debounceTarget(...args: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(debounceTarget, args);
    }, delay);
  };
}
