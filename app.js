window.onload = init;
function init() {
  if (localStorage.getItem("bps") == null) {
    var bps = [];
    localStorage.setItem("bps", JSON.stringify(bps));
  }

  fetchBPs();
  makeChart();
}
document.getElementById("bpInputForm").addEventListener("submit", saveBP);

function saveBP(e) {
  var bpTime = document.getElementById("bpTime").value;
  var bpSys = document.getElementById("bpSys").value;
  var bpDia = document.getElementById("bpDia").value;
  var bpId = chance.guid();

  var bp = {
    id: bpId,
    time: bpTime,
    sys: bpSys,
    dia: bpDia,
  };

  if (localStorage.getItem("bps") == null) {
    var bps = [];
    bps.push(bp);
    localStorage.setItem("bps", JSON.stringify(bps));
  } else {
    var bps = JSON.parse(localStorage.getItem("bps"));
    bps.push(bp);
    localStorage.setItem("bps", JSON.stringify(bps));
  }

  document.getElementById("bpInputForm").reset();

  fetchBPs();
  makeChart();

  e.preventDefault();
}

function deleteBP(id) {
  var bps = JSON.parse(localStorage.getItem("bps"));

  for (var i = 0; i < bps.length; i++) {
    if (bps[i].id == id) {
      bps.splice(i, 1);
    }
  }

  localStorage.setItem("bps", JSON.stringify(bps));

  fetchBPs();
  makeChart();
}

function fetchBPs() {
  var bps = JSON.parse(localStorage.getItem("bps"));
  var bpList = document.getElementById("bpList");

  bpList.innerHTML = "";

  for (var i = 0; i < bps.length; i++) {
    var id = bps[i].id;
    var time = new Date(bps[i].time);
    var sys = bps[i].sys;
    var dia = bps[i].dia;

    bpList.innerHTML +=
      '<div class="bg-white text-indigo-800 p-2 rounded shadow-lg leading-tight font-semibold mt-2 md:mt-0">' +
      "<div class='flex justify-between'>" +
      "<h6>" +
      time.toDateString() +
      "</h6>" +
      '<a class="" href="#" onclick="deleteBP(\'' +
      id +
      "')\"><i class='fa fa-times-circle'></i></a>" +
      "</div>" +
      "<p class='font-thin text-center'>Sys<span class='text-5xl font-thin'>" +
      sys +
      "</span> Dia<span class='text-5xl font-thin'>" +
      dia +
      "</span></p>" +
      "<p class='font-thin flex justify-center md:justify-around -mt-2'><span>mmHg</span><span class='pl-12 md:pl-0'>mmHg</span></p>";
    ("</div>");
  }
}

var bps = JSON.parse(localStorage.getItem("bps"));
function makeChart() {
  var bps = JSON.parse(localStorage.getItem("bps"));
  var time = [];
  var sys = [];
  var dia = [];
  for (var i = 0; i < bps.length; i++) {
    var timeObj = new Date(bps[i].time);
    time.push(timeObj.toDateString());
    sys.push(bps[i].sys);
    dia.push(bps[i].dia);
  }

  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: time,
      datasets: [
        {
          label: "Systolic",
          data: sys,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 1,
        },
        {
          label: "Diastolic",
          data: dia,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              padding: 0,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              padding: 0,
            },
          },
        ],
      },
    },
  });
}
