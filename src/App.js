import { useEffect, useState } from 'react';
import './App.css';
import RouteSwitcher from './components/RouteSwitcher/RouteSwitcher'
import { getUsers } from './api/api'

function App() {
  const [response, setResponse] = useState({ loading: true, data: undefined })
  useEffect(() => {
    getUsers().then(response => {
      if (response.data !== "") {
        setResponse({
          loading: false,
          data: response.data.results
        })
      } else {
        setResponse({
          loading: true,
          data: undefined
        })
      }
    })
  }, [])
  return (
    <div className="App">
      <section className="content">
        {!response.loading && <RouteSwitcher data={response.data} />}
      </section>
    </div>
  );
}

export default App;
