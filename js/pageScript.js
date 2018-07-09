$(document).ready(function(){

    var JSONdata = "";
    var MaxVal = [];
    var MinVal = [];
    var OpenVal = [];
    var CloseVal = [];
    var DateVal = [];
    
    var StartDay = "";
    var DayOnWeek = "";
    var APIKey = "Jc8Lx5QNNhtXrxQouefG";
    

    function arrayMax(array) {
    return array.reduce(function(a, b) {
        return Math.max(a, b);
    });
    }
    
    function arrayMin(array) {
    return array.reduce(function(a, b) {
        return Math.min(a, b);
    });
    }

    function FetchMarket(StockName, Week){
        MaxVal = [];
        MinVal = [];
        OpenVal = [];
        CloseVal = [];
        DateVal = [];
        var Link = "https://www.quandl.com/api/v3/datasets/NSE/" + StockName + ".json?api_key=" + APIKey
        console.log(StockName)
        $.getJSON( Link, function( data ) {
          JSONdata = data; 
          DayFinder(Week);
        });
    };

    function DayFinder(Week){
      StartDay = new Date(JSONdata.dataset.end_date).getDay();
      DayOnWeek = StartDay * Week;
      if(StartDay == DayOnWeek){
          StartDay = 0;
      }else{
        StartDay = DayOnWeek - 5;
      }

      ArrarUpdater(StartDay,DayOnWeek);
    }

    function ArrarUpdater(FromDays , ToDays){
      for(i=FromDays; i<ToDays ; i++){
        MaxVal.push(JSONdata.dataset.data[i][2])
        MinVal.push(JSONdata.dataset.data[i][3])
        OpenVal.push(JSONdata.dataset.data[i][1])
        CloseVal.push(JSONdata.dataset.data[i][5])
        DateVal.push(JSONdata.dataset.data[i][0])
     }
        
        MaxVal = MaxVal.reverse();
        MinVal = MinVal.reverse();
        OpenVal = OpenVal.reverse();
        CloseVal = CloseVal.reverse();
        DateVal = DateVal.reverse();

        UpdateChart();
    }
    

    $("#GetData").on("click", function(){

       

        FetchMarket( $('#StockIDInput').val(),  $('#DaysInput').val());

    });

      

function UpdateChart(){

  $("#line-Chart").html("");

var speedCanvas = document.getElementById("line-Chart");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

var dataHigh = {
    label: "High",
    data: MaxVal,
    lineTension: 0.3,
    fill: false,
    borderColor: 'green',
    backgroundColor: 'transparent',
    pointBorderColor: 'green',
    pointBackgroundColor: 'lightgreen',
    pointRadius: 3,
    pointHoverRadius: 8,
    pointHitRadius: 15,
    pointBorderWidth:1,
    pointStyle: 'rect'
  };

  var dataOpen = {
    label: "Open",
    data: OpenVal,
    lineTension: 0.3,
    fill: false,
    borderColor: 'blue',
    backgroundColor: 'transparent',
    pointBorderColor: 'blue',
    pointBackgroundColor: 'lightblue',
    pointRadius: 3,
    pointHoverRadius: 8,
    pointHitRadius: 15,
    pointBorderWidth:1,
    pointStyle: 'rect'
  };

  var dataClose = {
    label: "Close",
    data: CloseVal,
    lineTension: 0.3,
    fill: false,
    borderColor: 'purple',
    backgroundColor: 'transparent',
    pointBorderColor: 'purple',
    pointBackgroundColor: 'purple',
    pointRadius: 3,
    pointHoverRadius: 8,
    pointHitRadius: 15,
    pointBorderWidth:1,
    pointStyle: 'rect'
  };


var dataLow = {
    label: "Low",
    data:MinVal,
    lineTension: 0.3,
    fill: false,
    borderColor: 'red',
    backgroundColor: 'transparent',
    pointBorderColor: 'red',
    pointBackgroundColor: 'red',
    pointRadius: 3,
    pointHoverRadius: 8,
    pointHitRadius: 15,
    pointBorderWidth:1,
    pointStyle: 'rect'
  };

var speedData = {
  labels:DateVal,
  datasets: [dataHigh, dataOpen,dataClose, dataLow]
};

var chartOptions = {
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
  }
};

var lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Chart.js Line Chart'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  }
});


}
      

});