/* 
Name: Min Woo Park
Email: parkminw@sheridancollege.ca
Date: 2021-03-01
Description: This is Assignment2 refering daily and Total confirmed cases in terms of Covid-19. 
*/ 

const selectProvince = document.querySelector(".selectProvince");
const date = document.querySelector(".date");
const dailyNumber = document.querySelector(".dailyNumber");
const totalNumber = document.querySelector(".totalNumber");
const leftArrow = document.querySelector(".fa-chevron-left");
const rightArrow = document.querySelector(".fa-chevron-right");
const dataTable = document.querySelector(".dataTable");
const tableBody = document.querySelector(".tableBody");
const submit = document.querySelector(".submit");
const dataOfTable =document.querySelector(".dataOfTable");
var ctx = document.getElementById("myChart").getContext("2d");
var ctx2 = document.getElementById("myChart2").getContext("2d");
let minusIndex = 1;
let plusIndex = 1;




const allData =[];
const canadaUpdatedDate = [];
const canadaDailyCase = [];
const canadaConfirmedCase = [];

const ontarioUpdatedDate = [];
const ontarioDailyCase = [];
const ontarioConfirmedCase = [];

const quebecUpdatedDate = [];
const quebecDailyCase = [];
const quebecConfirmedCase = [];

const bcUpdatedDate = [];
const bcDailyCase = [];
const bcConfirmedCase = [];

const albertaUpdatedDate = [];
const albertaDailyCase = [];
const albertaConfirmedCase = [];


//fetch is based on Promise. 
fetch('http://ejd.songho.ca/ios/covid19.json')
.then(response => response.json())
.then(data => {
    let index = 0;
    data.forEach((element) => {
        allData[index] = element;
        index++;
    });

    let selctedCanada = allData.filter(allProvinces => allProvinces.prname == 'Canada' );
    let sortedCanada = selctedCanada.sort(selctedCanada.date);
    date.innerHTML = `Date: ${sortedCanada[sortedCanada.length - 1].date}`;
    dailyNumber.innerHTML =  sortedCanada[sortedCanada.length - 1].numtoday;
    totalNumber.innerHTML =  sortedCanada[sortedCanada.length - 1].numtotal;


    changeProvince();
    
    let selctedOntario = allData.filter(allProvinces => allProvinces.prname == 'Ontario' );
    let sortedOntario = selctedOntario.sort(selctedOntario.date);

    let selctedBC = allData.filter(allProvinces => allProvinces.prname == 'British Columbia' );
    let sortedBC = selctedBC.sort(selctedBC.date);
    
    let selctedQuebec = allData.filter(allProvinces => allProvinces.prname == 'Quebec' );
    let sortedQuebec = selctedQuebec.sort(selctedQuebec.date);

    let selctedAlberta = allData.filter(allProvinces => allProvinces.prname == 'Alberta' );
    let sortedAlberta = selctedAlberta.sort(selctedAlberta.date);
    
    calculateDate(sortedCanada[sortedCanada.length - 1].date, 'canada');
    updateDailyCases(sortedCanada, 'canada');
    updateConfirmedCases(sortedCanada, 'canada');
    uploadLineChart(canadaUpdatedDate, canadaDailyCase);
    uploadLineChart2(canadaUpdatedDate, canadaConfirmedCase);
    createDateTable(sortedCanada);


    // console.log(sortedCanada);
    // console.log(canadaConfirmedCase);
    // console.log(canadaUpdatedDate);
    // canadaUpdatedDate.forEach( (e, index) => {
    //   console.log(e + ":"+ canadaConfirmedCase[index] );
    // })
    

    leftArrow.addEventListener('click', () => {moveLeftDate()});
    rightArrow.addEventListener('click', () => {moveRightDate()});
    submit.addEventListener("click", (e)=>{
      console.log(e.value);

    })

    let lastValueInCanada = sortedCanada.length - 1;
    let lastValueInOntario = sortedOntario.length - 1;
    let lastValueInQuebec = sortedQuebec.length - 1;
    let lastValueInBC = sortedBC.length - 1;
    let lastValueInAlberta = sortedAlberta.length - 1;
    
    function moveLeftDate(){

      if(selectProvince.value =='canada'){
          
        if(minusIndex > 1 ){
          minusIndex = 1;
        }

        lastValueInCanada = lastValueInCanada - minusIndex;
        date.innerHTML = `Date: ${sortedCanada[lastValueInCanada].date}`;
        dailyNumber.innerHTML =  sortedCanada[lastValueInCanada].numtoday;
        totalNumber.innerHTML =  sortedCanada[lastValueInCanada].numtotal;
      } else if (selectProvince.value =='ontario'){
        
        if(minusIndex > 1){
          minusIndex = 1;
        }
        lastValueInOntario = lastValueInOntario - minusIndex;
        date.innerHTML = `Date: ${sortedOntario[lastValueInOntario].date}`;
        dailyNumber.innerHTML =  sortedOntario[lastValueInOntario].numtoday;
        totalNumber.innerHTML =  sortedOntario[lastValueInOntario].numtotal;
      } else if (selectProvince.value =='quebec'){
        if(minusIndex > 1){
          minusIndex = 1;
        }
        lastValueInQuebec = lastValueInQuebec - minusIndex;
        date.innerHTML = `Date: ${sortedQuebec[lastValueInQuebec].date}`;
        dailyNumber.innerHTML =  sortedQuebec[lastValueInQuebec].numtoday;
        totalNumber.innerHTML =  sortedQuebec[lastValueInQuebec].numtotal;
      } else if (selectProvince.value =='britishColumbia'){
        if(minusIndex > 1){
          minusIndex = 1;
        }
        lastValueInBC = lastValueInBC - minusIndex;
        date.innerHTML = `Date: ${sortedBC[lastValueInBC].date}`;
        dailyNumber.innerHTML =  sortedBC[lastValueInBC].numtoday;
        totalNumber.innerHTML =  sortedBC[lastValueInBC].numtotal;
      } else if (selectProvince.value =='alberta'){
        if(minusIndex > 1){
          minusIndex = 1;
        }
        lastValueInAlberta = lastValueInAlberta - minusIndex;
        date.innerHTML = `Date: ${sortedAlberta[lastValueInAlberta].date}`;
        dailyNumber.innerHTML =  sortedAlberta[lastValueInAlberta].numtoday;
        totalNumber.innerHTML =  sortedAlberta[lastValueInAlberta].numtotal;
      }

    }

    function moveRightDate(){

      if(selectProvince.value =='canada'){
        
        lastValueInCanada = lastValueInCanada + plusIndex;

        if (lastValueInCanada > sortedCanada.length - 1 ){
      
          lastValueInCanada = sortedCanada.length - 1;
        }
      
        date.innerHTML = `Date: ${sortedCanada[lastValueInCanada].date}`;
        dailyNumber.innerHTML =  sortedCanada[lastValueInCanada].numtoday;
        totalNumber.innerHTML =  sortedCanada[lastValueInCanada].numtotal;
      } else if (selectProvince.value =='ontario'){

        lastValueInOntario = lastValueInOntario + plusIndex;

        if (lastValueInOntario > sortedOntario.length - 1 ){
      
          lastValueInOntario = sortedOntario.length - 1;
        }
        date.innerHTML = `Date: ${sortedOntario[lastValueInOntario].date}`;
        dailyNumber.innerHTML =  sortedOntario[lastValueInOntario].numtoday;
        totalNumber.innerHTML =  sortedOntario[lastValueInOntario].numtotal;
      } else if (selectProvince.value =='quebec'){

        lastValueInQuebec = lastValueInQuebec + plusIndex;

        if (lastValueInQuebec > sortedQuebec.length - 1 ){
      
          lastValueInQuebec = sortedQuebec.length - 1;
        }
        date.innerHTML = `Date: ${sortedQuebec[lastValueInQuebec].date}`;
        dailyNumber.innerHTML =  sortedQuebec[lastValueInQuebec].numtoday;
        totalNumber.innerHTML =  sortedQuebec[lastValueInQuebec].numtotal;
      } else if (selectProvince.value =='britishColumbia'){

        lastValueInBC = lastValueInBC + plusIndex;

        if (lastValueInBC > sortedBC.length - 1 ){
      
          lastValueInBC = sortedBC.length - 1;
        }
        date.innerHTML = `Date: ${sortedBC[lastValueInBC].date}`;
        dailyNumber.innerHTML =  sortedBC[lastValueInBC].numtoday;
        totalNumber.innerHTML =  sortedBC[lastValueInBC].numtotal;
      } else if (selectProvince.value =='alberta'){

        lastValueInAlberta = lastValueInAlberta + plusIndex;

        if (lastValueInAlberta > sortedAlberta.length - 1 ){
      
          lastValueInAlberta = sortedAlberta.length - 1;
        }
        date.innerHTML = `Date: ${sortedAlberta[lastValueInAlberta].date}`;
        dailyNumber.innerHTML =  sortedAlberta[lastValueInAlberta].numtoday;
        totalNumber.innerHTML =  sortedAlberta[lastValueInAlberta].numtotal;
      }

    }

    function changeProvince(){

        selectProvince.addEventListener('change',(event) => {
            
          lastValueInCanada = sortedCanada.length - 1; //Reset value of canada
          lastValueInOntario = sortedOntario.length - 1;  //Reset value of ontario
          lastValueInQuebec = sortedQuebec.length - 1;  //Reset value of quebec
          lastValueInBC = sortedBC.length - 1;  //Reset value of BC
          lastValueInAlberta = sortedAlberta.length - 1;  //Reset value of alberta

            if(event.target.value === 'ontario'){
               date.innerHTML =`Date: ${sortedOntario[sortedOntario.length - 1].date}`;
               dailyNumber.innerHTML =  sortedOntario[sortedOntario.length - 1].numtoday;
               totalNumber.innerHTML =  sortedOntario[sortedOntario.length - 1].numtotal;
               calculateDate(sortedOntario[sortedOntario.length - 1].date, 'ontario');
               updateDailyCases(sortedOntario, 'ontario');
               updateConfirmedCases(sortedOntario, 'ontario');
               uploadLineChart(ontarioUpdatedDate, ontarioDailyCase);
               uploadLineChart2(ontarioUpdatedDate, ontarioConfirmedCase);
               createDateTable(sortedOntario);

            } else if(event.target.value === 'canada'){
                date.innerHTML = `Date: ${sortedCanada[sortedCanada.length - 1].date}`;
                dailyNumber.innerHTML =  sortedCanada[sortedCanada.length - 1].numtoday;
                totalNumber.innerHTML =  sortedCanada[sortedCanada.length - 1].numtotal;

               calculateDate(sortedCanada[sortedCanada.length - 1].date, 'canada');
               updateDailyCases(sortedCanada, 'canada');
               uploadLineChart(canadaUpdatedDate, canadaDailyCase);
               updateConfirmedCases(sortedCanada, 'canada');
               uploadLineChart2(canadaUpdatedDate, canadaConfirmedCase);
               createDateTable(sortedCanada);
            } else if (event.target.value === 'quebec'){
                date.innerHTML = `Date: ${sortedQuebec[sortedQuebec.length - 1].date}`;
                dailyNumber.innerHTML =  sortedQuebec[sortedQuebec.length - 1].numtoday;
                totalNumber.innerHTML =  sortedQuebec[sortedQuebec.length - 1].numtotal;

               calculateDate(sortedQuebec[sortedQuebec.length - 1].date, 'quebec');
               updateDailyCases(sortedQuebec, 'quebec');
               uploadLineChart(quebecUpdatedDate, quebecDailyCase);
               updateConfirmedCases(sortedQuebec, 'quebec');
               uploadLineChart2(quebecUpdatedDate, quebecConfirmedCase);
               createDateTable(sortedQuebec);


            } else if (event.target.value === 'britishColumbia'){
                date.innerHTML = `Date: ${sortedBC[sortedBC.length - 1].date}`;
                dailyNumber.innerHTML =  sortedBC[sortedBC.length - 1].numtoday;
                totalNumber.innerHTML =  sortedBC[sortedBC.length - 1].numtotal;

               calculateDate(sortedBC[sortedBC.length - 1].date, 'bc');
               updateDailyCases(sortedBC, 'bc');
               uploadLineChart(bcUpdatedDate, bcDailyCase);
               updateConfirmedCases(sortedBC, 'bc');
               uploadLineChart2(bcUpdatedDate, bcConfirmedCase);
               createDateTable(sortedBC);
            
              } else if (event.target.value === 'alberta'){
              date.innerHTML = `Date: ${sortedAlberta[sortedAlberta.length - 1].date}`;
              dailyNumber.innerHTML =  sortedAlberta[sortedAlberta.length - 1].numtoday;
              totalNumber.innerHTML =  sortedAlberta[sortedAlberta.length - 1].numtotal;

             calculateDate(sortedAlberta[sortedAlberta.length - 1].date, 'alberta');
             updateDailyCases(sortedAlberta, 'alberta');
             uploadLineChart(albertaUpdatedDate, albertaDailyCase);
             updateConfirmedCases(sortedAlberta, 'alberta');
             uploadLineChart2(albertaUpdatedDate, albertaConfirmedCase);
             createDateTable(sortedAlberta);
          }
        
        })
    }

    function calculateDate(update, input){

      let startDate = moment("2020-01-30");
      let updatedDate = moment(`${update}`);
      let days = updatedDate.diff(startDate, "days");
      let province = selectProvinceInDate(input);
      
        for(let i = 0; i < days; i++ ){
            let nextDate = startDate.add(`1`, "days");
            province[i] = nextDate.format("YYYY-MM-DD");
        }
    }

    function selectProvinceInDate(province){
      if(province == 'canada'){
        return canadaUpdatedDate;
      } else if (province == 'ontario'){
        return ontarioUpdatedDate;
      } else if (province == 'quebec'){
        return quebecUpdatedDate;
      } else if (province == 'bc'){
        return bcUpdatedDate;
      } else if (province == 'alberta'){
        return albertaUpdatedDate;
      }
    }

    function updateDailyCases(province, input){

      let updatedDate = selectProvinceInDate(input);
      let dailyCase = selectProvinceInDailyCase(input);
       
      for(let index = 0;  index < updatedDate.length; index++ ){

        for(let i = 0; i < province.length; i++){
          if (updatedDate[index].localeCompare(province[i].date) == 0){  
            dailyCase[index] = province[i].numtoday;
          } 
        }

        if(!dailyCase[index]){

          dailyCase[index] = 0;
        }

      }
    }

    function updateConfirmedCases(province, input){

      let updatedDate = selectProvinceInDate(input);
      let confirmedCase = selectProvinceInConfirmedCase(input);
       
      for(let index = 0;  index < updatedDate.length; index++ ){

        for(let i = 0; i < province.length; i++){
          if (updatedDate[index].localeCompare(province[i].date) == 0){  
            confirmedCase[index] = province[i].numtotal;
          } 
        }

        if(!confirmedCase[index]){

          confirmedCase[index] = 0;
        }

      }
    }

    function selectProvinceInDailyCase(province){
      if(province == 'canada'){
        return canadaDailyCase;
      } else if (province == 'ontario'){
        return ontarioDailyCase;
      } else if (province == 'quebec'){
        return quebecDailyCase;
      } else if (province == 'bc'){
        return bcDailyCase;
      } else if (province == 'alberta'){
        return albertaDailyCase;
      }
    }

    function selectProvinceInConfirmedCase(province){
      if(province == 'canada'){
        return canadaConfirmedCase;
      } else if (province == 'ontario'){
        return ontarioConfirmedCase;
      } else if (province == 'quebec'){
        return quebecConfirmedCase;
      } else if (province == 'bc'){
        return bcConfirmedCase;
      } else if (province == 'alberta'){
        return albertaConfirmedCase;
      }
    };

    function createDateTable(province){

      /*province.forEach(e => {
        console.log(e.date);
        console.log(e.numtestedtoday);
      })*/
     
      province.forEach(element => {
        let newRow = dataTable.insertRow(-1);
        let rowClass = document.createAttribute("class");
        rowClass.value = "tableBody";
        newRow.setAttributeNode(rowClass);
        
        let dateCell = newRow.insertCell(0);
        let todayConfirmedCell = newRow.insertCell(1);
        let totalConfirmedCell = newRow.insertCell(2);
        let todayTestedCell = newRow.insertCell(3);
        let totalTestedCell = newRow.insertCell(4);
        let todayDeathsCell = newRow.insertCell(5);
        let totalDeathsCell = newRow.insertCell(6);
        
        let date = document.createTextNode(`${element.date}`);
        let todayConfirmed = document.createTextNode(`${element.numtoday}`);
        let totalConfirmed = document.createTextNode(`${element.numtotal}`);
        let todayTested = document.createTextNode(`${element.numtestedtoday}`);
        let totalTested = document.createTextNode(`${element.numtested}`);
        let todayDeaths = document.createTextNode(`${element.numdeathstoday}`);
        let totalDeaths = document.createTextNode(`${element.numdeaths}`);        
        
        
        dateCell.appendChild(date);
        todayConfirmedCell.appendChild(todayConfirmed);
        totalConfirmedCell.appendChild(totalConfirmed);
        todayTestedCell.appendChild(todayTested);
        totalTestedCell.appendChild(totalTested);
        todayDeathsCell.appendChild(todayDeaths);
        totalDeathsCell.appendChild(totalDeaths);
      })
    }

   

    // function selectDateInTable{

    // }
});




function uploadLineChart(date, dailyCase){
  var myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          data: dailyCase,
          borderColor: "#36a2eb",
          backgroundColor:["rgba(45, 169, 210, 0.31)"]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Daily Confirmed Cases",
        fontSize: 25,
      },
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
    },
  });

}

function uploadLineChart2(date, dailyCase){
  var myLineChart = new Chart(ctx2, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          data: dailyCase,
          borderColor: "#fc0303",
          backgroundColor:["rgba(210, 45, 45, 0.39)"]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Total Confirmed Cases",
        fontSize: 25,
      },
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
    },
  });

}



      