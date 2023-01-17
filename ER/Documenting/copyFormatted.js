function copytext(formattedText) {
 // const formattedText = 'This is a <b>bold</b> and <u>underlined</u> test.';
  const blob = new Blob([formattedText], {type: 'text/html'});
  const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
  navigator.clipboard.write([clipboardItem]);
}
