import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import ResumeList from './components/ResumeList';
// import ResumePreview from './components/ResumePreview';
import FormMain from './components/FormMain';
import SinglePreview from './components/SinglePreview';
import HomePage from './components/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
              {path: "", element: <HomePage />},
              {path: "resume-list", element: <ResumeList />},
              // {path: "single-preview", element: <ResumePreview />},
              {path: "create-new", element: <FormMain />},
              {path: "edit/:uniqueid", element: <FormMain />},
              {path: "preview/:uniqueid", element: <SinglePreview />},
              // {path: "*", element: <ResumeList />}
            ]
  }
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
reportWebVitals();
