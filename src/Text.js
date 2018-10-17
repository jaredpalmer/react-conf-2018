import React from 'react';
import theme from '@common/theme';
import { css } from 'glamor';

const alignStyles = {
  center: {
    textAlign: 'center',
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
};

const fontStyles = {
  normal: {
    fontStyle: 'normal',
  },
  italic: {
    fontStyle: 'italic',
  },
};

const weightStyles = {
  normal: {
    fontWeight: '400',
  },
  bold: {
    fontWeight: '700',
  },
};

const rootStyles = {
  fontFamily: theme.fontFamily,
  fontSize: theme.fontSize.normal,
  fontWeight: 'normal',
  lineHeight: `${theme.lineHeight}`,
};

export default class Text extends React.PureComponent {
  render() {
    const {
      align,
      color,
      fontStyle,
      size,
      uppercase,
      weight,
      is: Component = 'div',
      ...other
    } = this.props;
    return (
      <Component
        {...css([
          rootStyles,
          align && alignStyles[align],
          color && { color: theme.colors[color] },
          fontStyle && fontStyles[fontStyle],
          size && { fontSize: theme.fontSize[size] },
          weight && weightStyles[weight],
          uppercase && uppercase,
        ])}
        {...other}
      />
    );
  }
}

Text.displayName = 'AppText';
