import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { Provider } from 'react-redux';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { CookiesProvider } from 'react-cookie';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <CookiesProvider>
            <RouterProvider router={router} />
          </CookiesProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
