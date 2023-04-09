import AppRoutes from './routes/AppRoutes';
import Contexts from './contexts/Contexts';

function App() {
  return (
    <Contexts>
      <AppRoutes />
    </Contexts>
  );
}

export default App;
