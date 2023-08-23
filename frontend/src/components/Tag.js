function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getTextColor(color) {
  const rgb = hexToRgb(color);
  const brightness = Math.round(((rgb.r * 299) +
    (rgb.g * 587) +
    (rgb.b * 114)) / 1000);

  return (brightness > 125) ? 'black' : 'white';
}

function Tag({ children, color }) {
  return (
    <span className="rounded-lg p-2 text-sm font-semibold" style={{ backgroundColor: color, color: getTextColor(color) }}>
      {children}
    </span>
  );
}

export default Tag;
