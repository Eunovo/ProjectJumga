import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { CartProvider } from './hooks/cart';
import { Routes } from './Routes';
import { CurrentUserProvider } from './state/AppState';


function App() {
  return (
    <SnackbarProvider>
      <CurrentUserProvider>
        <CartProvider>
          <div className="App">
            <CssBaseline />
            <Routes />
          </div>
        </CartProvider>
      </CurrentUserProvider>
    </SnackbarProvider>
  );
}

export default App;
