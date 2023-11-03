import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import router from './routes';

const queryClient = new QueryClient;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

document.title = "Ariel - portfolio"

root.render(
  <React.StrictMode>

    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        {/** Let the router decide what gets rendered */}
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>

    </ChakraProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
