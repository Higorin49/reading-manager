import React, { useEffect } from "react";
import Quagga from "quagga";

const BookScanner = props => {
  const { setData } = props;

  useEffect(() => {
    const config = {
      "inputStream": {
        "type": "LiveStream",
        "constraints": {
          "width": { "min": 450 },
          "height": { "min": 300 },
          // "facingMode": "environment",
          // "aspectRatio": { "min": 1, "max": 2 }
        }
      },
      "locator": {
        "patchSize": "medium",
        "halfSample": true
      },
      "numOfWorkers": 2,
      // "frequency": 10,
      "decoder": {
        "readers": ["ean_reader"]
      },
      "locate": true
    }


    Quagga.init(config, err => {
      if (err) {
        console.log(err, "error msg");
      }
      Quagga.start();
      return () => {
        Quagga.stop()
      }
    });


    Quagga.onDetected((detected) => {
      console.log(detected);
      setData("isbn",detected.codeResult.code);
      Quagga.stop();
    });
  }, []);

  
  return (
    <div id="interactive" className="viewport" />
  );
};

export default BookScanner;
