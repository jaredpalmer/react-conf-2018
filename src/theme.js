const color = {
  white: '#fff',
  darken: 'rgba(0,0,0,.25)',
  black: '#000',
  opaque: 'rgba(255,255,255,.6)',
  blue: '#09f',
  red: '#f44',
  green: 'rgb(70, 178, 117)',
  lightblue: '#8df',
  deepblue: '#05f',
  oil: '#222',
  metal: '#444',
  aluminum: '#666',
  ash: '#888',
  gray: '#aaa',
  platinum: '#bbb',
  silver: '#ccc',
  cloud: '#ddd',
};

const fontSize = {
  root: '14px',
  small: '0.85rem',
  normal: '1rem',
  large: '1.25rem',
  xlarge: '2rem',
  xxlarge: '3rem',
};
const lineHeight = 1.3125;
const bold = 500;

const media = {
  small: '@media (min-width: 500px)',
  medium: '@media (min-width: 700px)',
  large: '@media (min-width: 1200px)',
};

const shadow = {
  medium: '0 5px 15px rgba(0,0,0,.07)',
  large: '0 15px 35px rgba(50,50,93,.1)',
};

export default {
  color,
  bold,
  lineHeight,
  media,
  shadow,
  fontSize,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, ' +
    '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', // emoji fonts
  spaceX: 0.6,
  spaceY: 1.3125,
};
