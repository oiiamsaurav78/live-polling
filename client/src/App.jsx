import { usePoll } from "./context/PollContext";
import RoleSelect from "./pages/RoleSelect";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";

function App() {
  const { role } = usePoll();

  if (!role) return <RoleSelect />;

  if (role === "student") return <StudentPage />;
  if (role === "teacher") return <TeacherPage />;

  return null;
}

export default App;
