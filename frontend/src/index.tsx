import React from 'react';
import ReactDOM from 'react-dom/';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { QueryClient, QueryClientProvider } from "react-query";
import {RecoilRoot} from 'recoil'
import {ReactQueryDevtools} from 'react-query/devtools'


const queryClient = new QueryClient();


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);