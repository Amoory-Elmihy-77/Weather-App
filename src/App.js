import './App.css';
import Weather from './components/weather';
import { createTheme, ThemeProvider, } from '@mui/material';

const Theme = createTheme({
  typography: {
    fontFamily: ["IBM"]
  }
});
function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <Weather />
      </div>
    </ThemeProvider>
  );
}

export default App;
