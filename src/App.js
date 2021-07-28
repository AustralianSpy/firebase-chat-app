import React, { lazy, Suspense } from 'react';
import * as ROUTES from './constants/routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context';
import './styles/styles.css';

const Login = lazy(() => import('./components/login'));
const Chat = lazy(() => import('./components/chat'));

export default function App() {
  return (
    <div>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <AuthProvider>
            <Switch>
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.CHAT} component={Chat} />
            </Switch>
          </AuthProvider>
        </Suspense>
      </Router>
    </div>
  );
}