import SpaceShip from "../../assets/images/SpaceShip.png";

export default function Summary() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="w-[700px] space-y-5">
        <h3 className="text-2xl">
          Thanks for participating in our experiment! We would appreciate if you
          could take 5 more minutes and fill the post study questionnaire.
        </h3>
        <button className="btn btn-primary">Open Google Form</button>
      </div>
    </div>
  );
}
