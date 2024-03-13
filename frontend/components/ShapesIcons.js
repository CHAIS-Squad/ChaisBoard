import React from 'react';

const ShapesIcon = ({ shapeType }) => {
  let icon = null;

  switch (shapeType) {
    case 'Rectangle':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
          <path d="M24,21H0V3H24ZM2,19H22V5H2Z"/>
        </svg>
      );
      break;
    case 'Circle':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
          <path d="M12,24A12,12,0,1,1,24,12,12.013,12.013,0,0,1,12,24ZM12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Z"/>
        </svg>
      );
      break;
    case 'Star':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
          <path d="M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453ZM12,15.346l3.658,2.689-1.4-4.344L17.937,11H13.39L12,6.669,10.61,11H6.062l3.683,2.691-1.4,4.344Z"/>
        </svg>
      );
      break;
    case 'Hexagon':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
          <path d="M0,12c0-.81,.2-1.62,.59-2.36L3.81,3.64c.87-1.63,2.56-2.64,4.41-2.64h7.58c1.85,0,3.54,1.01,4.41,2.64l3.2,6c.79,1.48,.79,3.24,0,4.71l-3.2,6c-.87,1.63-2.56,2.64-4.41,2.64h-7.58c-1.85,0-3.53-1.01-4.41-2.64L.59,14.37C.2,13.63,0,12.82,0,12Zm22,0c0-.49-.12-.97-.35-1.41l-3.2-6c-.52-.98-1.54-1.59-2.65-1.59h-7.58c-1.11,0-2.12,.61-2.64,1.58l-3.22,6c-.47,.89-.48,1.95,0,2.84l3.22,6c.52,.98,1.54,1.58,2.64,1.58h7.58c1.11,0,2.12-.61,2.65-1.59h0l3.2-6c.24-.44,.35-.93,.35-1.41Z"/>
        </svg>
      );
      break;
    case 'RightArrow':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
          <path d="M23.12,9.91,19.25,6a1,1,0,0,0-1.42,0h0a1,1,0,0,0,0,1.41L21.39,11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H21.45l-3.62,3.61a1,1,0,0,0,0,1.42h0a1,1,0,0,0,1.42,0l3.87-3.88A3,3,0,0,0,23.12,9.91Z"/>
        </svg>
      );
      break;
    case 'LeftArrow':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
          <path d="M.88,14.09,4.75,18a1,1,0,0,0,1.42,0h0a1,1,0,0,0,0-1.42L2.61,13H23a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H2.55L6.17,7.38A1,1,0,0,0,6.17,6h0A1,1,0,0,0,4.75,6L.88,9.85A3,3,0,0,0,.88,14.09Z"/>
        </svg>
      );
      break;
    default:
      break;
  }

  return icon;
};

export default ShapesIcon;
