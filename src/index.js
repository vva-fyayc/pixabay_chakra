import React from 'react';
import ReactDOM from 'react-dom';
import ImageContainer from './containers/ImageContainer';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ImageContainer />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
