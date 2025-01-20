import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { Provider } from 'react-redux';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { CookiesProvider } from 'react-cookie';
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <CookiesProvider>
          <RouterProvider router={router} />
        </CookiesProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
