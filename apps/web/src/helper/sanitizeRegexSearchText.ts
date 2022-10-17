export default function sanitizeRegexSearchText(text: string) {
  return text.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");
}
