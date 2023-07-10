import TerminalController from "./Terminal";
import LineChart from "./Chart";

const data = [
  {
    symbol: "MSFT",
    date: "2000-01-01",
    Impressions: 39.81,
  },
  {
    symbol: "MSFT",
    date: "2001-02-01",
    Impressions: 36.35,
  },
  {
    symbol: "MSFT",
    date: "2002-03-01",
    Impressions: 43.22,
  },
  {
    symbol: "MSFT",
    date: "2003-04-01",
    Impressions: 28.37,
  },
  {
    symbol: "MSFT",
    date: "2004-05-01",
    Impressions: 25.45,
  },
  {
    symbol: "MSFT",
    date: "2005-06-01",
    Impressions: 32.54,
  },
  {
    symbol: "MSFT",
    date: "2006-07-01",
    Impressions: 28.4,
  },
  {
    symbol: "MSFT",
    date: "2007-08-01",
    Impressions: 28.4,
  },
  {
    symbol: "MSFT",
    date: "2008-09-01",
    Impressions: 24.53,
  },
  {
    symbol: "MSFT",
    date: "2009-10-01",
    Impressions: 28.02,
  },
  {
    symbol: "MSFT",
    date: "2010-11-01",
    Impressions: 23.34,
  },
  {
    symbol: "MSFT",
    date: "2011-12-01",
    Impressions: 17.65,
  },
];

export default function Question() {
  return (
    <div className="flex w-full h-[calc(100%-4rem)] p-10">
      <div className="h-full w-full flex relative shadow-md rounded-md overflow-hidden">
        <div className="h-full w-[34%]">
          <TerminalController />
        </div>
        <div className="w-[66%] h-full absolute top-0 right-0 flex items-center justify-center bg-[#252a33]">
          <div className="w-[800px] h-[400px]">
            <LineChart data_type="impressions" Data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
