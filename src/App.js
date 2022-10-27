import './Styles/MainPage.css'
import './App.css';
import Tabs from './components/Tabs';
import Navbar from './components/Navbar';


function App() {
  return (
 <>
<Navbar />
<div >
    <div className="row">
      

    <div class="column">
        <h1>Cat WebSite : Because why not?</h1>
        <p>cats are strange , Lion is also a cat</p>

      </div>

      <div class="column">
        <div>
          <Tabs />
        </div>
      </div>

    </div>
    </div>
    </>
  );
}

export default App;
