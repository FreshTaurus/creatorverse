import { useRoutes, Link } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import './App.css';

export default function App() {
  const routes = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/new', element: <AddCreator /> },
    { path: '/creators/:id', element: <ViewCreator /> },
    { path: '/creators/:id/edit', element: <EditCreator /> },
  ]);
  
  return (
    <main className="container">
      {routes}
    </main>
  );
}