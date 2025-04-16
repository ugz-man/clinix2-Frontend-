import { useDarkMode } from "../contexts/DarkModeContext";

function ShowInfoForm({ onCloseModal }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex flex-col gap-2">
      <button className="self-start" onClick={toggleDarkMode}>
        {isDarkMode ? "☀️" : "🌙"}
      </button>
      <h3>Welcome to Clinix</h3>
      <p className="mb-3">
        Your personal health companion powered by{" "}
        <em className="font-bold">Groq</em>. Get real-time health insights,
        smart recommendations, and track your wellness effortlessly — all in one
        place. Whether you’re managing a condition or just staying on top of
        your health, we’ve got you covered.
      </p>
      <button
        className="bg-primary-500 dark:bg-dark-primary-700 p-2 text-white hover:border"
        onClick={onCloseModal}
      >
        Ok, Got It
      </button>
    </div>
  );
}

export default ShowInfoForm;
