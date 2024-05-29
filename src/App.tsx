import Daily from './components/Charts/Daily';
import Hourly from './components/Charts/Hourly';
import { ChartsProvider } from './cotext/ChartsProvider';
import './app.css';
import Filters from './components/Filters';

function App() {
  return (
    <ChartsProvider>
      <div className="w-full h-full text-secondary-foreground bg-primary-foreground">
        <div className="container flex flex-col gap-10 pt-10">
          <div className="flex gap-10 h-72">
            <div className="flex-grow">
              <Hourly />
            </div>
            <Daily />
          </div>
          <div>
            <Filters />
          </div>
        </div>
      </div>
    </ChartsProvider>
  );
}

export default App;
