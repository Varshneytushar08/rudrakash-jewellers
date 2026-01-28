fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQI4xSuQ89AYPvUgjMH9t7ZgKBMvm_s06BLA3HlgwPdtHxdM45i0fyE1rGp56bEOQGiT9bUo-elTlsa/pub?output=csv")
  .then(response => response.text())
  .then(csv => {

    let lines = csv.trim().split("\n");

    let goldPrice = "";
    let silverPrice = "";

    for (let i = 1; i < lines.length; i++) {
      let cols = lines[i].split(",");

      let metal = cols[0].trim().toLowerCase();
      let price = cols[1].trim();

      if (metal === "gold") goldPrice = price;
      if (metal === "silver") silverPrice = price;
    }

    if (goldPrice && silverPrice) {
      document.getElementById("gold-price").innerText =
        "Gold (24K): ₹ " + goldPrice + " / gram";

      document.getElementById("silver-price").innerText =
        "Silver: ₹ " + silverPrice + " / gram";
    } else {
      throw "Prices not found";
    }

  })
  .catch(err => {
    console.error(err);
    document.getElementById("gold-price").innerText =
      "Gold price unavailable";
    document.getElementById("silver-price").innerText =
      "Silver price unavailable";
  });
