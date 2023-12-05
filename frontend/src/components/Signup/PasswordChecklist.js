const GreenCheck = () => (
  <svg
    className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
  </svg>
);

const NeutralCheck = () => (
  <svg
    className="w-3.5 h-3.5 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
  </svg>
);

export default function PasswordChecklist({
  moreThanEight,
  number,
  letter,
  passwordMatch,
}) {
  return (
    <ul className="text-gray-500 list-inside h-fit px-5 py-2 bg-[#191D24] shadow-lg rounded-xl text-sm space-y-1">
      <li className="flex items-center">
        {moreThanEight ? <GreenCheck /> : <NeutralCheck />}
        <p className="flex-shrink-0 flex-grow">At least 8 characters</p>
      </li>
      <li className="flex items-center">
        {number ? <GreenCheck /> : <NeutralCheck />}
        <p className="flex-shrink-0 flex-grow">At least one number</p>
      </li>
      <li className="flex items-center">
        {letter ? <GreenCheck /> : <NeutralCheck />}
        <p className="flex-shrink-0 flex-grow">At least one letter</p>
      </li>
      <li className="flex items-center">
        {passwordMatch ? <GreenCheck /> : <NeutralCheck />}
        <p className="flex-shrink-0 flex-grow">Passwords match</p>
      </li>
    </ul>
  );
}
