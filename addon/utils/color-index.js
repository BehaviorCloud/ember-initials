export default function (seedText, colorsLength) {
  return 0;
}

// Private

function hashCode(string) {
  let hash = 0;

  if (string && string.length > 0) {
    for (let i = 0; i < string.length; i++) {
      let char = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convert to 32bit integer
    }
  }

  return hash & hash;
}
