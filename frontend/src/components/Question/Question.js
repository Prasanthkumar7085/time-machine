import MyResponsiveLine from "./Chart";

const data = [
  {
    id: "japan",
    color: "hsl(311, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 65,
      },
      {
        x: "helicopter",
        y: 97,
      },
      {
        x: "boat",
        y: 151,
      },
      {
        x: "train",
        y: 177,
      },
      {
        x: "subway",
        y: 273,
      },
      {
        x: "bus",
        y: 59,
      },
      {
        x: "car",
        y: 248,
      },
      {
        x: "moto",
        y: 11,
      },
      {
        x: "bicycle",
        y: 268,
      },
      {
        x: "horse",
        y: 174,
      },
      {
        x: "skateboard",
        y: 181,
      },
      {
        x: "others",
        y: 73,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(122, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 278,
      },
      {
        x: "helicopter",
        y: 103,
      },
      {
        x: "boat",
        y: 211,
      },
      {
        x: "train",
        y: 146,
      },
      {
        x: "subway",
        y: 18,
      },
      {
        x: "bus",
        y: 83,
      },
      {
        x: "car",
        y: 190,
      },
      {
        x: "moto",
        y: 238,
      },
      {
        x: "bicycle",
        y: 15,
      },
      {
        x: "horse",
        y: 2,
      },
      {
        x: "skateboard",
        y: 73,
      },
      {
        x: "others",
        y: 114,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(326, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 20,
      },
      {
        x: "helicopter",
        y: 50,
      },
      {
        x: "boat",
        y: 229,
      },
      {
        x: "train",
        y: 38,
      },
      {
        x: "subway",
        y: 19,
      },
      {
        x: "bus",
        y: 184,
      },
      {
        x: "car",
        y: 71,
      },
      {
        x: "moto",
        y: 92,
      },
      {
        x: "bicycle",
        y: 45,
      },
      {
        x: "horse",
        y: 184,
      },
      {
        x: "skateboard",
        y: 236,
      },
      {
        x: "others",
        y: 298,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(169, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 73,
      },
      {
        x: "helicopter",
        y: 196,
      },
      {
        x: "boat",
        y: 193,
      },
      {
        x: "train",
        y: 47,
      },
      {
        x: "subway",
        y: 71,
      },
      {
        x: "bus",
        y: 8,
      },
      {
        x: "car",
        y: 106,
      },
      {
        x: "moto",
        y: 182,
      },
      {
        x: "bicycle",
        y: 79,
      },
      {
        x: "horse",
        y: 270,
      },
      {
        x: "skateboard",
        y: 34,
      },
      {
        x: "others",
        y: 75,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(51, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 232,
      },
      {
        x: "helicopter",
        y: 291,
      },
      {
        x: "boat",
        y: 174,
      },
      {
        x: "train",
        y: 123,
      },
      {
        x: "subway",
        y: 34,
      },
      {
        x: "bus",
        y: 94,
      },
      {
        x: "car",
        y: 140,
      },
      {
        x: "moto",
        y: 107,
      },
      {
        x: "bicycle",
        y: 4,
      },
      {
        x: "horse",
        y: 248,
      },
      {
        x: "skateboard",
        y: 23,
      },
      {
        x: "others",
        y: 18,
      },
    ],
  },
];

export default function Question() {
  return (
    <div className="flex w-full h-full justify-center items-center gap-5">
      <div className="w-[500px] text-justify">
        <p>
          Welcome to 1980. Post-It Notes and the Rubik’s Cube have just hit the
          stores.
          <br />
          <br />
          Your job as a scientist in 1980 is to predict future global CO2
          concentrations so humans can prepare for coming changes. Below, you
          can see historical data for global CO2 concentrations for the past 20
          years in parts per million. Your task is to predict concentrations in
          1985. After you make your prediction, we will time travel ahead to
          1985 to see how accurate you were.
          <br />
          <br />
          What will global CO2 concentrations be in 1985 (in parts per million)?
        </p>
      </div>
      <div className="w-[800px] h-[400px]">
        <MyResponsiveLine data={data} />
      </div>
    </div>
  );
}
