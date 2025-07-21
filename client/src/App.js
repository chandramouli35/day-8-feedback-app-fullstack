import "./App.css";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Feedback App</h1>
      <FeedbackForm />
    </div>
  );
}

export default App;
