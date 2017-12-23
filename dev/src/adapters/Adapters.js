import App from './App';
import Games from './Games';
import Players from './Players';
import Users from './Users';

const Adapters = {
  App: new App(),
  Games: new Games(),
  Players: new Players(),
  Users: new Users()
};

export default Adapters;
