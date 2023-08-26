import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { acceptDisclaimer } from "../../redux/user/userActions";
import { useEffect } from "react";

export default function Disclaimer() {
  const { isDisclaimerAccepted } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAccept = () => {
    dispatch(acceptDisclaimer()).then(() => {
      console.log("hi");
      navigate("/welcome");
    });
  };

  useEffect(() => {
    if (isDisclaimerAccepted) {
      navigate("/welcome");
    }
  }, []);

  return (
    <div className="flex w-full h-[calc(100%-4rem)] justify-center items-center">
      <div className="flex flex-col gap-5">
        <div className="w-[600px] text-justify space-y-2">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Venenatis cras sed felis eget velit. Diam quis enim lobortis
            scelerisque fermentum dui faucibus. Aliquam etiam erat velit
            scelerisque in dictum. Malesuada proin libero nunc consequat
            interdum varius sit amet. Nulla malesuada pellentesque elit eget
            gravida cum sociis.
          </p>
          <p>
            Tincidunt lobortis feugiat vivamus at. Vitae ultricies leo integer
            malesuada nunc. Non pulvinar neque laoreet suspendisse. Felis
            bibendum ut tristique et egestas quis. Senectus et netus et
            malesuada. Mi quis hendrerit dolor magna. Eget magna fermentum
            iaculis eu non diam phasellus vestibulum. Egestas tellus rutrum
            tellus pellentesque. Malesuada bibendum arcu vitae elementum
            curabitur vitae.
          </p>
          <p>
            Est velit egestas dui id ornare arcu odio. Urna condimentum mattis
            pellentesque id nibh tortor id aliquet. Nunc faucibus a pellentesque
            sit amet porttitor eget dolor morbi. Sed enim ut sem viverra aliquet
            eget sit. Auctor elit sed vulputate mi sit amet mauris commodo. Amet
            dictum sit amet justo donec enim diam vulputate ut. Nullam non nisi
            est sit amet facilisis. Curabitur gravida arcu ac tortor dignissim
            convallis. Eu augue ut lectus arcu bibendum at. Habitant morbi
            tristique senectus et netus et. Lobortis feugiat vivamus at augue.
            Aliquam malesuada bibendum arcu vitae elementum curabitur vitae
            nunc. Ultricies leo integer malesuada nunc vel risus commodo
            viverra.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-sm btn-primary" onClick={onAccept}>
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
