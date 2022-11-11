const esModules = ['@react-leaflet', 'react-leaflet'].join('|');

module.export = {
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
"jest": {
  "moduleNameMapper": {
    "react-leaflet": "<rootDir>/mocks/reactLeafletMock.js"
  }
}
