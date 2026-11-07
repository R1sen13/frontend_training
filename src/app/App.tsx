import { AppRouter } from './router.tsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <main className="App">
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}

export default App;
