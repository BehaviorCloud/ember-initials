import Ember from 'ember';

function _generateElement(name, styles = {}, attrs = {}) {
  return Ember.$(name).attr(attrs).css(styles);
}

function generateTextElement(text, color, styles = {}) {
  return _generateElement('<text></text>', styles, {
    y: '50%',
    x: '50%',
    dy: '0.35em',
    'text-anchor': 'middle',
    'pointer-events': 'auto',
    fill: color,
  }).html(text);
}

function generateSvgElement(width, height, styles = {}) {
  return _generateElement('<svg></svg>', styles, {
    width,
    height,
    xmlns: 'http://www.w3.org/2000/svg',
    'pointer-events': 'none',
  });
}

export function generateImage(properties) {
  let textElement = generateTextElement(properties.initials, properties.initialsColor, properties.textStyles);
  let svgElement = generateSvgElement(properties.width, properties.height, properties.backgroundStyles);

  svgElement.append(textElement);
  let finalElement = Ember.$('<div>').append(svgElement);
  let imageContent = window.btoa(finalElement.html());

  return 'data:image/svg+xml;base64,' + imageContent;
}

export function generateInitials(name) {
  let initials = name ? name : '';
  let letters = initials.match(/(\b\w)/g) || [];

  if (letters.length > 1) {
    let first = letters.shift().toUpperCase();
    let last = letters.pop().toUpperCase();
    initials = first + last;
  } else if (letters.length === 1) {
    initials = letters.shift().toUpperCase();
  }

  return initials;
}
