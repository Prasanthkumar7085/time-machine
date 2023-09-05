import SpaceShip from "../../assets/images/SpaceShip.png";

export default function Summary() {
  return (
    <div className="hero h-[calc(100%-4rem)]">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Thanks!</h1>
          <p className="py-6">
            Thanks for participating in our experiment! We would appreciate if
            you could take 5 more minutes and fill the post study questionnaire.
          </p>
          <button className="btn btn-primary">Open Google Form</button>
        </div>
      </div>
    </div>
  );
}
