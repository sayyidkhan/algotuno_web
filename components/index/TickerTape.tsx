import { TickerTape, CopyrightStyles } from "react-ts-tradingview-widgets";

let TickerTapeSymbol=
    [
        {
          "proName": "FOREXCOM:SPXUSD",
          "title": "S&P 500"
        },
        {
          "proName": "FOREXCOM:NSXUSD",
          "title": "NASDAQ 100"
        },
        {
            "proName": "CURRENCYCOM:GOLD",
            "title": "GOLD"
        },
        {
            "proName": "CURRENCYCOM:SILVER",
            "title": "SILVER"
        },
        {
          "proName": "FX_IDC:EURUSD",
          "title": "EUR/USD"
        },
        {
          "proName": "BITSTAMP:BTCUSD",
          "title": "BTC/USD"
        },
        {
          "proName": "BITSTAMP:ETHUSD",
          "title": "ETH/USD"
        }
      ]


export const TickerTapeComponent = () => {
  const styles: CopyrightStyles = {
    parent: {
      fontSize: "0px",
      color: "red",
    },
    link: {
      textDecoration: "line-trough",
    },
    span: {
      color: "darkblue",
    },
  };
  return <TickerTape  symbols={TickerTapeSymbol} copyrightStyles={styles} />;
};