import React, { lazy, Suspense } from 'react';
import * as ROUTES from './constants/routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context';
import './styles/styles.css';

const Login = lazy(() => import('./components/login'));
const Chats = lazy(() => import('./components/chats'));

export default function App() {
  return (
    <div>
      <Router>
        <Suspense fallback={
          <div className="suspense-body">
             <div className="load-wrapp">
                <div className="load-3">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
          </div>
        }>
          <AuthProvider>
            <Switch>
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.CHATS} component={Chats} />
            </Switch>
          </AuthProvider>
        </Suspense>
      </Router>
    </div>
  );
}