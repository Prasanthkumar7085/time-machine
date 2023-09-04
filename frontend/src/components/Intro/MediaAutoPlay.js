import React, { useEffect } from "react";
import { useMediaRemote } from "@vidstack/react";

export default function MediaAutoPlay({ play }) {
  const remote = useMediaRemote();

  useEffect(() => {
    if (play) {
      remote.play();
    }
  }, [play, remote]);

  return <></>;
}
