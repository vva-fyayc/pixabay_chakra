import React from 'react';
import ReactDOM from 'react-dom';
import ImageContainer from './containers/ImageContainer';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <ImageContainer />
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
