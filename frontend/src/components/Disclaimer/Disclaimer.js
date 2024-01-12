import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { acceptDisclaimer } from "../../redux/user/userActions";

export default function Disclaimer() {
  const { isDisclaimerAccepted } = useSelector((state) => state.user);
  const [ageChecked, setAgeChecked] = useState(false);
  const [osfConsent, setOsfConsent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAccept = useCallback(() => {
    dispatch(acceptDisclaimer({ osfConsent })).then(() => {
      navigate("/scientist-name");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [osfConsent]);

  useEffect(() => {
    if (isDisclaimerAccepted) {
      navigate("/scientist-name");
    }
  }, []);

  return (
    <div className="flex w-full h-[calc(100%-4rem)] justify-center items-center">
      <div className="flex flex-col gap-5 justify-center items-center text-justify">
        <div className="w-[632px] h-[500px] overflow-y-scroll space-y-2 bg-[rgba(0,0,0,.2)] p-4 rounded-md text-sm">
          <p>
            This is a two-part psychological research study consisting of a game
            involving making predictions about changes in social domains, and a
            survey that collects information about you and your traits. This
            survey focuses on forecasting trends in human welfare and the types
            of predictions people make.
          </p>
          <p>
            If you decide to participate, you will be asked to predict trends in
            certain social domains in previous years and will be given feedback
            and scored based on your accuracy. You will be asked for your email
            to create an account so that you may log-in and keep track of your
            progress, however, your email will not be retained and is used to
            log in only. You will see a page with four domains of human welfare
            (Public Health, Peace and War, Climate, and Economy) within which
            you will have the option to make predictions using a line graph. You
            will also receive feedback on the accuracy of your predictions. The
            game is followed by an online survey that should take about 10
            minutes to complete. You will be asked demographic questions about
            your age, sex, education, ethnicity, and income, as well as measures
            to determine other characteristics. As part of this, you may be
            asked about things like interactions you have had, or general
            trivia-style questions. None of your written responses in the survey
            or game will be used as study data.
          </p>
          <p>
            Playing the game and participating in this study is voluntary. You
            may decline to answer any questions that you do not wish to answer,
            and you can withdraw your participation at any time during the game
            or survey by ceasing to answer questions. Your responses will no
            longer be identifiable once they are submitted. You will not receive
            anything for your participation in this study. Participation in this
            study might allow you to learn about social trends in the past and
            about your own abilities to predict these changes. The study will
            benefit the academic community by providing insight into forecasting
            patterns of laypeople and their awareness of social change. There
            are no anticipated risks associated with this study.
          </p>
          <p>
            You will be completing the post-game survey via Qualtrics, which has
            implemented technical, administrative, and physical safeguards to
            protect the information from loss, misuse, and unauthorized access,
            disclosure, alteration, or destruction. However, when information is
            transmitted over the internet privacy cannot be guaranteed. There is
            always a risk your responses may be intercepted by a third party
            (e.g., government agencies, hackers). Qualtrics temporarily collects
            your computer IP address to avoid duplicate responses in the dataset
            but we will not retain this information. All of your responses to
            these scales will be stored on a secure server at the University of
            Waterloo to which only authorized researchers have access. If you
            prefer not to submit your survey responses through this host, please
            do not sign up for this study.
          </p>
          <p>
            The association between your identity and provided responses is
            confidential. The email you provide to make your account for the
            time machine game is for log-in purposes and progress tracking
            purposes only and will not be attached to any of your personal data
            or used to identify you. All of the data will be summarized, and no
            individual could be identified from these summarized results. The
            data collected, with no personal identifiers, will be maintained on
            the survey website until the conclusion of the study. Afterwards, it
            will be electronically archived for a minimum of 7 years on a
            password-protected computer database in the psychology department at
            the University of Waterloo, Canada.
          </p>
          <p>
            De-identified data related to your participation may be submitted to
            an online repository and / or journal (i.e., the data may be
            publicly available). These data will be completely
            deidentified/anonymized prior to submission and will be presented in
            aggregate form in publications. This process is integral to the
            research process as it allows other researchers to verify results
            and avoid duplicating research. Though the data is posted for the
            purpose listed, other individuals may access these data by accessing
            the open access repository, including our research collaborators at
            the University of Pennsylvania. Although the dataset without
            identifiers may be shared publicly, your identity will always remain
            confidential. The Open Science Framework is publicly accessible,
            meaning that it may be accessed by other researchers to answer new
            research questions, or by members of the scientific community who
            are not subject to the Tri-Council Policy Statement on research
            ethics. Should you not wish to submit your data in this manner,
            please do not select this study.
          </p>
          <p>
            This study has been reviewed and received ethics clearance through a
            University of Waterloo Research Ethics Board (REB [45944]).
          </p>
          <p>
            If you have questions for the Board, contact the Office of Research
            Ethics, toll-free at 1-833-643-2379 (Canada and USA),
            1-519-888-4440, or reb@uwaterloo.ca.
          </p>
          <p>
            By indicating your consent you are not waiving your legal rights or
            releasing the investigator(s) or involved institution(s) from their
            legal and professional responsibilities.
          </p>
        </div>
        <div className="w-[600px]">
          <p className="mb-2 text-sm">
            Please indicate if you agree to have an anonymized copy of your data
            be stored on Open Science Framework for future research.
          </p>
          <label
            htmlFor="osfconsent"
            className="inline-flex items-centerrounded-md cursor-pointer text-gray-800"
          >
            <input
              id="osfconsent"
              type="checkbox"
              className="hidden peer"
              value={osfConsent}
              onChange={() => {
                setOsfConsent((prevOsfConsent) => !prevOsfConsent);
              }}
            />
            <span className="px-3 h-8 inline-flex justify-center items-center text-xs text-neutral-content font-semibold rounded-l-md bg-neutral peer-checked:bg-primary peer-checked:text-primary-content">
              Yes, I consent.
            </span>
            <span className="px-3 h-8 inline-flex justify-center items-center text-xs text-primary-content font-semibold rounded-r-md bg-primary peer-checked:bg-neutral peer-checked:text-neutral-content">
              No, I do not consent.
            </span>
          </label>
        </div>
        <div className="w-[600px]">
          <p className="mb-2">
            If you understand the above information and agree to participate,
            please click the “I Agree” button below.
          </p>
          <input
            type="checkbox"
            value={ageChecked}
            id="age"
            onChange={() => {
              setAgeChecked((prevAgeChecked) => !prevAgeChecked);
            }}
          />
          <label className="ml-2 cursor-pointer" htmlFor="age">
            I confirm that I am 16 years of age or older.
          </label>
        </div>
        <div className="flex gap-3 w-[600px]">
          <button
            className="btn btn-sm btn-primary"
            onClick={onAccept}
            disabled={!ageChecked}
          >
            I Agree!
          </button>
          <button className="btn btn-sm btn-ghost" onClick={undefined}>
            I Don't want to participate!
          </button>
        </div>
      </div>
    </div>
  );
}
