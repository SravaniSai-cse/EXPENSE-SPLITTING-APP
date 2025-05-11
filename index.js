import { ExpenseProvider } from './ExpenseContext';

ReactDOM.render(
  <AuthProvider>
    <ExpenseProvider>
      <App />
    </ExpenseProvider>
  </AuthProvider>,
  document.getElementById('root')
);
