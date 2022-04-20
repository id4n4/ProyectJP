// CARGA DE DATOS
$("#myForm").submit(function(e) {
  e.preventDefault();
});

function loadData(){
  const v = {
    b: document.forms['myForm']['b'].value,
    l: document.forms['myForm']['l'].value,
    sigmaP: document.forms['myForm']['sigmaP'].value,
    cr: document.forms['myForm']['cr'].value,
    cc: document.forms['myForm']['cc'].value,
    ys: document.forms['myForm']['ys'].value,
    e: document.forms['myForm']['e'].value,
    theta: document.forms['myForm']['theta'].value,
    nCapas: document.forms['myForm']['nCapas'].value,
    mCapas: document.forms['myForm']['mCapas'].value,
    yd: document.forms['myForm']['yd'].value,
    PESolido: document.forms['myForm']['PESolido'].value,
    vs: document.forms['myForm']['vs'].value,
    gs: document.forms['myForm']['gs'].value,
    kpa: document.forms['myForm']['kpa'].value,
  }
  sessionStorage.setItem('var',JSON.stringify(v))
  console.log(v)

  //Result Variables
  const resultV = document.getElementById('resultV')
  let ys = parseFloat(v.ys * 9.81)
  let theta1 = parseFloat(v.b / v.nCapas)
  let theta2 = parseFloat(v.b * 3 / v.mCapas)
  resultV.innerHTML += '<p>ys(KN/cm<sup>3</sup>) = <b>'+ys.toFixed(2)+'</b> </p>'
  resultV.innerHTML += '<p>&thetasym; 1 = <b>'+theta1.toFixed(2)+'</b></p>'
  resultV.innerHTML += '<p>&thetasym; 2 = <b>'+theta2.toFixed(2)+'</b></p>'

  //Result Relación de Vacio
  let ws = parseFloat(v.PESolido * v.vs * v.gs)
  let volumenT = parseFloat(ws / v.yd)
  let volumenA = parseFloat(volumenT - v.vs)
  let e0 = parseFloat(volumenA / v.vs)
  const resultRelacionV = document.getElementById('resultRelacionV')
  resultRelacionV.innerHTML += '<p>ws = <b>'+ws.toFixed(2)+'</b></p>'
  resultRelacionV.innerHTML += '<p>Vol Total (cm)  = <b>'+volumenT.toFixed(2)+'</b></p>'
  resultRelacionV.innerHTML += '<p>Vol Aire = <b>'+volumenA.toFixed(2)+'</b></p>'
  resultRelacionV.innerHTML += '<p>e0 = <b>'+e0.toFixed(2)+'</b></p>'

  //Result Esquina
  let B = parseFloat(v.b / 2)
  let L = parseFloat(v.l /2)
  let uncuartopi = parseFloat(1/(4*Math.PI))
  const resultEsquina = document.getElementById('resultEsquina')
  resultEsquina.innerHTML += '<p>B = <b>'+B+'</b></p>'
  resultEsquina.innerHTML += '<p>L = <b>'+L+'</b></p>'
  resultEsquina.innerHTML += '<p>1/4&#960; = <b>'+uncuartopi.toFixed(4)+'</b></p>'
}


//---------------------------------------
//TABLA --------------------------------------
//---------------------------------------
$(() => {
    $('#gridContainer').dxDataGrid({
      dataSource: customers,
      keyExpr: 'ID',
      columns: ['CompanyName', 'City', 'State', 'Phone', 'Fax'],
      showBorders: true,
    });
  });


  const customers = [{
    ID: 1,
    CompanyName: 'Super Mart of the West',
    Address: '702 SW 8th Street',
    City: 'Bentonville',
    State: 'Arkansas',
    Zipcode: 72716,
    Phone: '(800) 555-2797',
    Fax: '(800) 555-2171',
    Website: 'http://www.nowebsitesupermart.com',
  }, {
    ID: 2,
    CompanyName: 'Electronics Depot',
    Address: '2455 Paces Ferry Road NW',
    City: 'Atlanta',
    State: 'Georgia',
    Zipcode: 30339,
    Phone: '(800) 595-3232',
    Fax: '(800) 595-3231',
    Website: 'http://www.nowebsitedepot.com',
  }, {
    ID: 3,
    CompanyName: 'K&S Music',
    Address: '1000 Nicllet Mall',
    City: 'Minneapolis',
    State: 'Minnesota',
    Zipcode: 55403,
    Phone: '(612) 304-6073',
    Fax: '(612) 304-6074',
    Website: 'http://www.nowebsitemusic.com',
  }, {
    ID: 4,
    CompanyName: "Tom's Club",
    Address: '999 Lake Drive',
    City: 'Issaquah',
    State: 'Washington',
    Zipcode: 98027,
    Phone: '(800) 955-2292',
    Fax: '(800) 955-2293',
    Website: 'http://www.nowebsitetomsclub.com',
  }, {
    ID: 5,
    CompanyName: 'E-Mart',
    Address: '3333 Beverly Rd',
    City: 'Hoffman Estates',
    State: 'Illinois',
    Zipcode: 60179,
    Phone: '(847) 286-2500',
    Fax: '(847) 286-2501',
    Website: 'http://www.nowebsiteemart.com',
  }, {
    ID: 6,
    CompanyName: 'Walters',
    Address: '200 Wilmot Rd',
    City: 'Deerfield',
    State: 'Illinois',
    Zipcode: 60015,
    Phone: '(847) 940-2500',
    Fax: '(847) 940-2501',
    Website: 'http://www.nowebsitewalters.com',
  }, {
    ID: 7,
    CompanyName: 'StereoShack',
    Address: '400 Commerce S',
    City: 'Fort Worth',
    State: 'Texas',
    Zipcode: 76102,
    Phone: '(817) 820-0741',
    Fax: '(817) 820-0742',
    Website: 'http://www.nowebsiteshack.com',
  }, {
    ID: 8,
    CompanyName: 'Circuit Town',
    Address: '2200 Kensington Court',
    City: 'Oak Brook',
    State: 'Illinois',
    Zipcode: 60523,
    Phone: '(800) 955-2929',
    Fax: '(800) 955-9392',
    Website: 'http://www.nowebsitecircuittown.com',
  }, {
    ID: 9,
    CompanyName: 'Premier Buy',
    Address: '7601 Penn Avenue South',
    City: 'Richfield',
    State: 'Minnesota',
    Zipcode: 55423,
    Phone: '(612) 291-1000',
    Fax: '(612) 291-2001',
    Website: 'http://www.nowebsitepremierbuy.com',
  }, {
    ID: 10,
    CompanyName: 'ElectrixMax',
    Address: '263 Shuman Blvd',
    City: 'Naperville',
    State: 'Illinois',
    Zipcode: 60563,
    Phone: '(630) 438-7800',
    Fax: '(630) 438-7801',
    Website: 'http://www.nowebsiteelectrixmax.com',
  }, {
    ID: 11,
    CompanyName: 'Video Emporium',
    Address: '1201 Elm Street',
    City: 'Dallas',
    State: 'Texas',
    Zipcode: 75270,
    Phone: '(214) 854-3000',
    Fax: '(214) 854-3001',
    Website: 'http://www.nowebsitevideoemporium.com',
  }, {
    ID: 12,
    CompanyName: 'Screen Shop',
    Address: '1000 Lowes Blvd',
    City: 'Mooresville',
    State: 'North Carolina',
    Zipcode: 28117,
    Phone: '(800) 445-6937',
    Fax: '(800) 445-6938',
    Website: 'http://www.nowebsitescreenshop.com',
  }];

//---------------------------------------
//Gráfica --------------------------------------
//---------------------------------------
Highcharts.chart('container', {
  chart: {
    type: 'area'
  },
  title: {
    text: 'Historic and Estimated Worldwide Population Distribution by Region'
  },
  subtitle: {
    text: 'Source: Wikipedia.org'
  },
  accessibility: {
    point: {
      valueDescriptionFormat: '{index}. {point.category}, {point.y:,.0f} millions, {point.percentage:.1f}%.'
    }
  },
  xAxis: {
    categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
    tickmarkPlacement: 'on',
    title: {
      enabled: false
    }
  },
  yAxis: {
    labels: {
      format: '{value}%'
    },
    title: {
      enabled: false
    }
  },
  tooltip: {
    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
    split: true
  },
  plotOptions: {
    area: {
      stacking: 'percent',
      lineColor: '#ffffff',
      lineWidth: 1,
      marker: {
        lineWidth: 1,
        lineColor: '#ffffff'
      }
    }
  },
  series: [{
    name: 'Asia',
    data: [502, 635, 809, 947, 1402, 3634, 5268]
  }, {
    name: 'Africa',
    data: [106, 107, 111, 133, 221, 767, 1766]
  }, {
    name: 'Europe',
    data: [163, 203, 276, 408, 547, 729, 628]
  }, {
    name: 'America',
    data: [18, 31, 54, 156, 339, 818, 1201]
  }, {
    name: 'Oceania',
    data: [2, 2, 2, 6, 13, 30, 46]
  }]
});
