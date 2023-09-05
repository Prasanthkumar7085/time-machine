import { useSelector } from "react-redux";

export default function Summary() {
  const { id } = useSelector((state) => state.user);
  return (
    <div className="hero h-[calc(100%-4rem)]">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Thanks!</h1>
          <p className="py-6">
            Thanks for participating in our experiment! We would appreciate if
            you could take 5 more minutes and fill the post study questionnaire.
          </p>
          <a
            className="btn btn-primary"
            href={`https://docs.google.com/forms/d/e/1FAIpQLScK0xAjn1pOZQY2iY9N_i2UhvnxsPBFvxrZG9Ta1FVeML5ryg/viewform?usp=pp_url&entry.799274315=${id}`}
            target="_blank"
            rel="noreferrer"
          >
            Open Google Form
          </a>
        </div>
      </div>
    </div>
  );
}
