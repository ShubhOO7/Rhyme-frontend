import Ticket from "./pages/Ticket";
import Login from "./pages/LoginForm";
import Register from "./pages/RegisterForm";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
    // const [username, setUsername] = useState("as");
    // console.log("USER");
    // console.log(username);
  return (

      <Router forceRefresh={true}>
          <div className="App">
              <Routes>
                  <Route path="/" element={<Register />} />
                  <Route path="/loginform" element={<Login />} />
                  <Route path="/tickets" element={<Ticket />} />
                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>

          </div>
      </Router>

  );
}

export default App;
