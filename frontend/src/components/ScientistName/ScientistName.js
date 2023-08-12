import TerminalController from "./Terminal";

export default function ScientistName() {
  return (
    <div className="flex w-full h-[calc(100%-4rem)] justify-center items-center">
      <div className="flex flex-row gap-5 w-[500px]">
        <TerminalController />
      </div>
    </div>
  );
}
