import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { CartProvider } from './hooks/cart';
import { Routes } from './Routes';


function App() {
  return (
    <SnackbarProvider>
      <CartProvider>
        <div className="App">
          <CssBaseline />
          <Routes />
        </div>
      </CartProvider>
    </SnackbarProvider>
  );
}

export default App;
