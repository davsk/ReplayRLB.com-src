var elRankCurrent, elRankDesired, elRankQueue, elBooster;

var Rankings = [{
  "id": 1,
  "value": 0,
  "label": "Bronze I",
}, {
  "id": 2,
  "value": 3,
  "label": "Bronze II",
}, {
  "id": 3,
  "value": 6,
  "label": "Bronze III",
}, {
  "id": 4,
  "value": 12,
  "label": "Silver I",
}, {
  "id": 5,
  "value": 18,
  "label": "Silver II",
}, {
  "id": 6,
  "value": 24,
  "label": "Silver III",
}, {
  "id": 7,
  "value": 30,
  "label": "Gold I",
}, {
  "id": 8,
  "value": 38,
  "label": "Gold II",
}, {
  "id": 9,
  "value": 46,
  "label": "Gold III",
}, {
  "id": 10,
  "value": 52,
  "label": "Platinum I",
}, {
  "id": 11,
  "value": 62,
  "label": "Platinum II",
}, {
  "id": 12,
  "value": 72,
  "label": "Platinum III",
}, {
  "id": 13,
  "value": 82,
  "label": "Diamond I",
}, {
  "id": 14,
  "value": 94,
  "label": "Diamond II",
}, {
  "id": 15,
  "value": 106,
  "label": "Diamond III",
}, {
  "id": 16,
  "value": 118,
  "label": "Champion I",
}, {
  "id": 17,
  "value": 133,
  "label": "Champion II",
}, {
  "id": 18,
  "value": 148,
  "label": "Champion III",
}, {
  "id": 19,
  "value": 188,
  "label": "Grand Champion I",
}, {
  "id": 20,
  "value": 230,
  "label": "Grand Champion II",
}, {
  "id": 21,
  "value": 300,
  "label": "Grand Champion III",
}, {
  "id": 22,
  "value": 450,
  "label": "Supersonic Legend",
}];

init();

function initForm() {
  alert("Init");
}

function init() {
  elRankCurrent = document.getElementById("rank-current");
  elRankDesired = document.getElementById("rank-desired");
  elRankQueue = document.getElementById('rank-queue');
  elBooster = document.getElementById('booster');
  buildOptList(elRankCurrent, 0);
  buildOptList(elRankDesired, 1);
}

function buildOptList(select, id) {
  select.innerHTML = null;

  //alert("Populate list");
  for (var i = id; i < Rankings.length; i++) {
    if ((id == 0) && (i == Rankings.length - 1)) {
        // do nothing
    } else {
        var el = document.createElement("option");
        el.textContent = Rankings[i].label;
        el.value = Rankings[i].value;
        select.appendChild(el);
      }
    }
  }

  function onChangeCurrent() {
    var opt = elRankCurrent.selectedIndex + 1;
    // alert("opt:= " + opt);
    buildOptList(elRankDesired, opt);
    calcPrice();
  }
  //This function should determine if the box is checked.
  function isBoosted() {
    return document.getElementById("booster").checked;
  }

  /* This fuction should calculate the price of the service based on options given. */
  function calcPrice() {
    // alert("Calc Price")
    let price = parseInt(elRankDesired.value) - parseInt(elRankCurrent.value);
    
    /* Increases price based on what mode they user selects. */
    let queue = elRankQueue.value;
    if (queue === '2v2') {
      price += (0.15 * price);
    } else if (queue === '3v3') {
      price += (0.25 * price);
    }

    /* Adds 50% to price if user selects the checkbox to play alongside. */
    if (isBoosted()) {
      price += (0.50 * price);
    }
    
    /* Convert to String Dollar Amount */
    price = price.toFixed(2);
    let text = "Boost $" + price + " USD";
    
    document.getElementById('price-text').innerHTML = text;
  }

  // Make sure to initialize the script.
  init();
