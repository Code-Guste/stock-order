import { useQuery } from "@tanstack/react-query";

import { httpClient } from "@Config/httpClient";

type GlobalQuoteResponse = {
  "Global Quote": {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  };
};

const getGlobalQuote = () => {
  return httpClient.get<GlobalQuoteResponse>(
    "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo",
  );
};

export const useGetGlobalQuoteQuery = () => {
  return useQuery({
    queryKey: ["globalQuote"],
    queryFn: () => {
      return getGlobalQuote().then((res) => res.data);
    },
  });
};
