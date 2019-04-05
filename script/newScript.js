google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawAllSheets);


  function drawAllSheets()  {

      if(document.getElementById('number_schools_div'))  {
      drawSheetName('Sheet2', 'SELECT A, B',
      numberofschoolsResponseHandler);
    }

    if(document.getElementById('absent_schools_div')) {
      drawSheetName('Sheet2', 'SELECT E, F',
      absentschoolsResponseHandler);
    }

    if(document.getElementById('shsatexam_year_div')) {
      drawSheetName('Sheet4', 'SELECT A, B, C',
      shsatexamResponseHandler);
    }

    if(document.getElementById('grade_level_div')) {
      drawSheetName('Sheet4', 'SELECT F, G, H',
      gradelevelResponseHandler);
    }


    if(document.getElementById('absent_teachers_div')) {
      drawSheetName('Sheet2', 'SELECT I, K, L',
      studentsabsentteachingResponseHandler);
    }

    if(document.getElementById('studentsshasatexam_div'))  {
      drawSheetName('Sheet4', 'SELECT L, M',
      studentsshsatexamResponseHandler);
    }

    if(document.getElementById('ela_exam_div'))  {
      drawSheetName('Sheet6', 'SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA',
      elaexamallgradesResponseHandler);
    }

    if(document.getElementById('math_exam_div')) {
      drawSheetName('Sheet7', 'SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA',
      mathexamallgradesResponseHandler);
    }

    if(document.getElementById('school_income_div')) {
      drawSheetName('Sheet2', 'SELECT O, P',
      schoolincomeestimateResponseHandler);
    }

}

function drawSheetName(sheetName, query, responseHandler)  {
    var queryString = encodeURIComponent(query);
       var query = new google.visualization.Query(
      'https://docs.google.com/spreadsheets/d/1Vu7jOciLzj10wGEbPQABdo3AGcchvuKn3yBEZML-j30/gviz/tq?sheet='
    + sheetName + '&headers=1&tq=' + queryString);
       query.send(responseHandler);
} //drawSheetName

function checkError(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() +
       ' ' + response.getDetailedMessage());
    return;
  }
} //checkError

function numberofschoolsResponseHandler(response)  {
    checkError(response);
  var data = response.getDataTable();
  data.sort({column: 1, desc: true});

  var options = {
    height: 400,
    width: 600,
    title: 'Number of schools in each city',
    is3D: true,
    backgroundColor: 'none'
  };
  var chart = new google.visualization.PieChart(document.getElementById('number_schools_div'));
  chart.draw(data, options);
}

function educationSpendingResponseHandler(response)   {
    checkError(response);
  var data= response.getDataTable();

  var options= {
    height: 600,
    width: 900,
    legend: 'top',
    bars: 'horizontal',
    annotations: {alwaysOutside: true},
    backgroundColor: 'none',
    title: 'Racist Distribution in New York City schools',
    vAxis: {
      title: 'City',
      titleTextStyle: {
        fontSize:14,
        bold: true
      }
    },
    hAxis: {
      title: 'New York Cities',
      format:'short',
      titleTextStyle:{
        fontSize:14,
        bold: true
      }
    }
  };

  var chart = new google.visualization.BarChart(document.getElementById('racist_distribution_div'));
  chart.draw(data, options);
} //educationSpendingResponseHandler

function absentschoolsResponseHandler(response) {
    checkError(response);
  var data= response.getDataTable();

  var options={
    title: 'Schools vs Absent ratio',
    vAxis: {title: 'Absent ratio'},
    legend: 'none',
    backgroundColor: 'none',
    colors: ['#FFD700','green'],
    is3D:true
  };
  var chart= new google.visualization.ScatterChart(document.getElementById('absent_schools_div'));
  chart.draw(data, options);
}

function shsatexamResponseHandler(response)  {

  checkError(response);
  var data= response.getDataTable();

  var options = {
    height: 400,
    title: 'Students registered for exam vs Students took exam',

    isStacked: 'True',
    vAxis: {title: 'Number of students'},
    hAxis: {title: 'Year'},
    backgroundColor: 'none',
    colors: ['#DDA0DD','#4B0082'],
    is3D:true
  };

  //if(document.getElementById('shsatexam_year_div')) {
    var chart = new google.visualization.AreaChart(document.getElementById('shsatexam_year_div'));
    chart.draw(data, options);
  //}

}

function gradelevelResponseHandler(response)  {

  checkError(response);
  var data= response.getDataTable();

  var options= {
    height: 400,
    title: '7th and 8th grade students registered for exam vs students who took exam',
    hAxis: {title: 'Number of students'},
    vAxis: {title: 'Grade'},
    backgroundColor: 'none',
  };

  var chart= new google.visualization.BarChart(document.getElementById('grade_level_div'));
  chart.draw(data, options);
}

function studentsabsentteachingResponseHandler(response) {

  checkError(response);
  var data= response.getDataTable();

  var options={
    title: "Correlation between Students absent rate and collaborative teaching",
    hAxis: {title: 'Percentage of students chronically absent'},
    vAxis: {title: 'Percentage of collabotaive teachers'},
    bubble: {textStyle: {fontSize: 11}},
    backgroundColor: 'none',
  };
  var chart= new google.visualization.BubbleChart(document.getElementById('absent_teachers_div'));
  chart.draw(data, options);
}

function studentsshsatexamResponseHandler(response) {

  checkError(response);
  var data= response.getDataTable();

  var options={
    title: "Overall in schools Students who registeres for exam vs students who gave exam",
    hAxis: {title: 'Schools'},
    vAxis: {title: 'Number of students'},
    backgroundColor: 'none',
    pieHole: 0.4,

  };

  var chart= new google.visualization.PieChart(document.getElementById('studentsshasatexam_div'));
  chart.draw(data, options);
}

function elaexamallgradesResponseHandler(response) {
  checkError(response);
  var data= response.getDataTable();

  var options={
    title: "City analysis of students who scores 4 in ela",
    backgroundColor: 'none',
    curveType: 'function'
  };
  var chart= new google.visualization.LineChart(document.getElementById('ela_exam_div'));
  chart.draw(data, options);
}

function mathexamallgradesResponseHandler(response) {
  checkError(response);
  var data= response.getDataTable();

  var options={
    title: "City analysis of students who scores 4 in Math",
    backgroundColor: 'none',
    curveType: 'function'
  };
  var chart= new google.visualization.LineChart(document.getElementById('math_exam_div'));
  chart.draw(data, options);
}

function schoolincomeestimateResponseHandler(response)  {
  checkError(response);
  var data=response.getDataTable();

  var options={
    title: "School Income Estimate",
    hAxis: {title:'Cities'},
    vAxis: {title:'Income'},
    backgroundColor: 'none',
  };

  var chart= new google.visualization.ColumnChart(document.getElementById('school_income_div'));
  chart.draw(data, options);
}
