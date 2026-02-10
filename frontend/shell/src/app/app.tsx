import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const Teacher = React.lazy(() => import('teacher/Module'));
const Learner = React.lazy(() => import('learner/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/teacher">Teacher</Link>
        </li>
        <li>
          <Link to="/learner">Learner</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="shell" />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/learner" element={<Learner />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
