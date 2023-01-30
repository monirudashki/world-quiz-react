import './App.css';

import Header from './Components/Core/Header/Header';
import { Footer } from './Components/Core/footer/Footer';
// import { Home } from './Components/Core/home-page/Home';
// import { Login } from './Components/Auth/Login/Login';
// import { Register } from './Components/Auth/Register/Register';
// import { Rules } from './Components/info/Rules/Rules';
// import { ScoreBoard } from './Components/info/ScoreBoard/ScoreBoard';
// import { UserProfile } from './Components/Auth/UserProfile/UserProfile';
// import { GameCapitals } from './Components/Feature/GameCapitals/GameCapitals';
// import { GameFlags } from './Components/Feature/GameFlags/GameFlags';
// import { Result } from './Components/Feature/Result/Result';
// import { AdminCapitalsQuestions } from './Components/admin/AdminCapitalsQuestions/AdminCapitalsQuestions';
// import { AdminFlagsQuestions } from './Components/admin/AdminFlagsQuestions/AdminFlagQuestions';
import { AdminAddQuestion } from './Components/admin/AdminActions/AdminAddQuestion';
import { AdminEditQuestion } from './Components/admin/AdminActions/AdminEditQuestion';

function App() {
  return (
    <div className="App">
      <Header></Header>

      <AdminEditQuestion />

      <Footer />
    </div>
  );
}

export default App;
