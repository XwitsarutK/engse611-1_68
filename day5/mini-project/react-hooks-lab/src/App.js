import './App.css';
import Counter from './components/Counter';
import NameForm from './components/NameForm';
import Clock from './components/Clock';
import ProfileEditor from './components/ProfileEditor';
import DebouncedSearch from './components/DebouncedSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <NameForm />
        <ProfileEditor />
        <Clock />
        <DebouncedSearch />
      </header>
    </div>
  );
}



export default App;