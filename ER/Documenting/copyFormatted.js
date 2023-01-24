function copyFormatted(formattedText) {

  const blob = new Blob([formattedText], {type: 'text/html'});
  const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
  navigator.clipboard.write([clipboardItem]);
}
