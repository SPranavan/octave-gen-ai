import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Chat from './components/Chat';
import './styles/App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Chat/>} />
      </Route>
    </>
  )
)

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;