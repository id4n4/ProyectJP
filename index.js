var data = []
var data2 = []
var charData = []
var charD = []
var categories = []
//---------------------------------------
//CARGA DE DATOS --------------------------------------
//---------------------------------------
$("#myForm").submit(function (e) {
  e.preventDefault();
});

function loadData() {
  data = []
  data2 = []
  charData = []
  charD = []
  categories = []
  let sumDeltaH = []
  let chartDataDeltaH = []
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
  let capasLado = parseInt(v.nCapas / 2)
  // sessionStorage.setItem('var',JSON.stringify(v))
  // console.log(v)

  //Result Variables
  const resultV = document.getElementById('resultV')
  let ys = parseFloat(v.ys * 9.81)
  let theta1 = parseFloat(v.b / v.nCapas)
  let theta2 = parseFloat(v.b * 3 / v.mCapas)
  resultV.innerHTML = '<p>ys(KN/cm<sup>3</sup>) = <b>' + ys.toFixed(2) + '</b> </p>'
  resultV.innerHTML += '<p>Escala horizontal = <b>' + theta1.toFixed(2) + '</b></p>'
  resultV.innerHTML += '<p>Escala profundidad = <b>' + theta2.toFixed(2) + '</b></p>'

  //Result Relación de Vacio
  let ws = parseFloat(v.PESolido * v.vs * v.gs)
  let volumenT = parseFloat(ws / v.yd)
  let volumenA = parseFloat(volumenT - v.vs)
  let e0 = parseFloat(volumenA / v.vs)
  const resultRelacionV = document.getElementById('resultRelacionV')
  resultRelacionV.innerHTML = '<p>ws = <b>' + ws.toFixed(2) + '</b></p>'
  resultRelacionV.innerHTML += '<p>Vol Total (cm)  = <b>' + volumenT.toFixed(2) + '</b></p>'
  resultRelacionV.innerHTML += '<p>Vol Aire = <b>' + volumenA.toFixed(2) + '</b></p>'
  resultRelacionV.innerHTML += '<p>e0 = <b>' + e0.toFixed(2) + '</b></p>'

  //Result Esquina
  let B = parseFloat(v.b / 2)
  let L = parseFloat(v.l / 2)
  let uncuartopi = parseFloat(1 / (4 * Math.PI))
  const resultEsquina = document.getElementById('resultEsquina')
  resultEsquina.innerHTML = '<p>B = <b>' + B + '</b></p>'
  resultEsquina.innerHTML += '<p>L = <b>' + L + '</b></p>'
  resultEsquina.innerHTML += '<p>1/4&#960; = <b>' + uncuartopi.toFixed(4) + '</b></p>'

  // load categories chart
  for (let i = B - (theta1 * 10); i <= B + (theta1 * 10); i += theta1) {
    charData[i] = []
    sumDeltaH[i] = []
    categories.push(i.toString())
  }
  // console.log(categories)
  //loadData
  let inicioPunto = B - (theta1 * 10)
  let finPunto = B
  while (inicioPunto <= finPunto) {
    let bpositivo = B + inicioPunto
    let bnegativo = B - inicioPunto
    let inicio = 0, fin = theta2, L2 = L * L
    let B2 = B * B
    let B2positivo = bpositivo * bpositivo
    let B2negativo = bnegativo * bnegativo
    for (let i = 0; i < v.mCapas; i++) {
      let z = (fin + inicio) / 2
      let z2 = z * z
      let esquina = 0, esquina1 = 0, esquina2 = 0
      let centro = 0
      let a = 0, c = 0, a1 = 0, a2 = 0, c1 = 0, c2 = 0
      if (inicioPunto == (B - (theta1 * 10))) { // si es la primera iteración - el centro
        let a = z2 + B2 + L2
        let c = B2 * L2 / z2
        let part1 = (2 * B * L * z * Math.sqrt(a)) / ((z2 * (B2 * L2 + z2)) + B2 * L2)
        let part2 = (B2 + L2 + 2 * z2) / a
        let part3 = (2 * B * L * z * Math.sqrt(a)) / ((z2 * a) + (B2 * L2))
        if (a < c) {
          esquina = uncuartopi * (part1 * part2 + Math.PI - Math.asin(part3))
        } else {
          esquina = uncuartopi * (part1 * part2 + Math.asin(part3))
        }
        centro = esquina * 4
      } else {
        //positivo
        a1 = z2 + B2positivo + L2
        c1 = B2positivo * L2 / z2
        let part1p = (2 * bpositivo * L * z * Math.sqrt(a1)) / ((z2 * (B2positivo * L2 + z2)) + B2positivo * L2)
        let part2p = (B2positivo + L2 + 2 * z2) / a1
        let part3p = (2 * bpositivo * L * z * Math.sqrt(a1)) / ((z2 * a1) + (B2positivo * L2))
        if (a1 < c1) {
          esquina1 = uncuartopi * (part1p * part2p + Math.PI - Math.asin(part3p))
        } else {
          esquina1 = uncuartopi * (part1p * part2p + Math.asin(part3p))
        }

        //negativo
        a2 = z2 + B2negativo + L2
        c2 = B2negativo * L2 / z2
        let part1n = (2 * bnegativo * L * z * Math.sqrt(a2)) / ((z2 * (B2negativo * L2 + z2)) + B2negativo * L2)
        let part2n = (B2negativo + L2 + 2 * z2) / a2
        let part3n = (2 * bnegativo * L * z * Math.sqrt(a2)) / ((z2 * a2) + (B2negativo * L2))
        if (a2 < c2) {
          esquina2 = uncuartopi * (part1n * part2n + Math.PI - Math.asin(part3n))
        } else {
          esquina2 = uncuartopi * (part1n * part2n + Math.asin(part3n))
        }
        centro = esquina1 * 2 + esquina2 * 2
      }
      let incEsfuerzo = v.kpa * centro
      
      let esfuerzo = z * v.ys
      let esfuerzoFinal = incEsfuerzo + esfuerzo
      let variacionE
      if (esfuerzoFinal < v.sigmaP) {
        variacionE = v.cr * Math.log10(esfuerzoFinal / esfuerzo)
      } else if (esfuerzo > v.sigmaP) {
        variacionE = v.cc * Math.log10(esfuerzoFinal / esfuerzo)
      } else {
        variacionE = (v.cr * Math.log10(v.sigmaP / esfuerzo)) + (v.cc * Math.log10(esfuerzoFinal / v.sigmaP))
      }
      let deformacion = variacionE / (1 + e0)
      let deltaH = deformacion * fin;
      charData[bpositivo].push(incEsfuerzo)
      sumDeltaH[bpositivo].push(deltaH)
      if (inicioPunto != B - (theta1 * 10)) {
        charData[bnegativo].push(incEsfuerzo)
        sumDeltaH[bnegativo].push(deltaH)
      }
      if (inicioPunto == (B - (theta1 * 10))) {
        data.push({
          'inicio': inicio,
          'fin': fin,
          'z': z,
          'A': a,
          'C': c,
          'esquina': esquina,
          'centro': centro,
          'incEsfuerzo': incEsfuerzo,
          'esfuerzo': esfuerzo,
          'esfuerzoFinal': esfuerzoFinal,
          'variacionE': variacionE,
          'deformacion': deformacion,
          'deltaH': deltaH,
        })
      } else {
        data2.push({
          'punto': bnegativo + ' - ' + bpositivo,
          'inicio': inicio,
          'fin': fin,
          'z': z,
          'A1': a1,
          'A2': a2,
          'C1': c1,
          'C2': c2,
          'esquina1': esquina1,
          'esquina2': esquina2,
          'centro': centro,
          'incEsfuerzo': incEsfuerzo,
          'esfuerzo': esfuerzo,
          'esfuerzoFinal': esfuerzoFinal,
          'variacionE': variacionE,
          'deformacion': deformacion,
          'deltaH': deltaH,
        })
      }
      //aumenta inicio y fin
      inicio = fin
      fin += theta2
    }
    inicioPunto += theta1
  }
  let sumaTotalDeltaH = []
  // chart data
  // console.log(sumDeltaH)
  let k = false
  for (let i = B - (theta1 * 10); i <= B + (theta1 * 10); i += theta1) {
    for (let d in charData[i]) {
      if (!k){
        charD[d] = {
          name: d,
          data: []
        }
      }
      charD[d].data.push(charData[i][d])
    }
    if (!k) {
      k = true
    }
    // load Delta table
    sumaTotalDeltaH.push({
      header: i,
      body: sumDeltaH[i].reduce(suma)
    })
    chartDataDeltaH.push([i,sumDeltaH[i].reduce(suma)])
  }
  // console.log(chartDataDeltaH)
  let tHeader = document.getElementById('asentamientoHeader')
  let tBody = document.getElementById('asentamientoBody')
  tHeader.innerHTML = '<th scope="col"></th>'
  tBody.innerHTML = '<th scope="row">Asentamientos inmediatos</th>'
  for(let o of sumaTotalDeltaH){
    tHeader.innerHTML += '<th scope="col">'+o.header+'</th>'
    tBody.innerHTML += '<td>'+o.body.toFixed(2)+'</td>'
  }

  //---------------------------------------
  //TABLA --------------------------------------
  //---------------------------------------
  //otros
  $(() => {
    $('#gridContainerOtros').dxDataGrid({
      dataSource: data2,
      columns: [{
        caption: '',
        dataField: 'punto',
        groupIndex: 0,
      }, {
        caption: 'Capa',
        fixed: true,
        columns: [{
          caption: 'Inicio',
          dataField: 'inicio',
          format: {
            type: "fixedPoint",
            precision: 1
          },
        }, {
          caption: 'Fin',
          dataField: 'fin',
          format: {
            type: "fixedPoint",
            precision: 1
          },
        }]
      }, {
        caption: 'Profundidad',
        columns: [{
          caption: 'z',
          dataField: 'z',
          format: {
            type: "fixedPoint",
            precision: 2
          },
        }]
      }, {
        caption: 'A1',
        columns: [{
          headerCellTemplate(container) {
            container.append($('<div>B<sup>2</sup> + L<sup>2</sup> + z<sup>2</sup> </div>'));
          },
          dataField: 'A1',
          format: {
            type: "fixedPoint",
            precision: 2
          },
        }]
      }, {
        caption: 'C1',
        columns: [{
          headerCellTemplate(container) {
            container.append($('<div>B<sup>2</sup> * L<sup>2</sup> / z<sup>2</sup> </div>'));
          },
          dataField: 'C1',
          format: {
            type: "fixedPoint",
            precision: 2
          },
        }]
      }, {
        caption: 'A2',
        columns: [{
          headerCellTemplate(container) {
            container.append($('<div>B<sup>2</sup> + L<sup>2</sup> + z<sup>2</sup> </div>'));
          },
          dataField: 'A2',
          format: {
            type: "fixedPoint",
            precision: 2
          },
        }]
      }, {
        caption: 'C2',
        columns: [{
          headerCellTemplate(container) {
            container.append($('<div>B<sup>2</sup> * L<sup>2</sup> / z<sup>2</sup> </div>'));
          },
          dataField: 'C2',
          format: {
            type: "fixedPoint",
            precision: 2
          },
        }]
      }, {
        caption: 'Esquina1',
        columns: [{
          caption: 'l',
          dataField: 'esquina1',
          format: {
            type: "fixedPoint",
            precision: 2
          },
        }]
      }, {
        caption: 'Esquina2',
        columns: [{
          caption: 'l',
          dataField: 'esquina2',
          format: {
            type: "fixedPoint",
            precision: 2
          },
        }]
      }, {
        caption: 'Centro',
        columns: [{
          caption: 'Sum. l',
          dataField: 'centro',
          // format: {
          //   type: "fixedPoint",
          //   precision: 2
          // },
        }]
      }, {
        caption: 'Incremento Esfuerzo',
        dataField: 'incEsfuerzo',
        format: {
          type: "fixedPoint",
          precision: 4
        },
      }, {
        caption: 'Esfuerzo In Situ, kPa',
        dataField: 'esfuerzo',
        format: {
          type: "fixedPoint",
          precision: 4
        },
      }, {
        caption: 'Esfuerzo Final',
        dataField: 'esfuerzoFinal',
        format: {
          type: "fixedPoint",
          precision: 4
        },
      }, {
        caption: 'Variación e',
        dataField: 'variacionE',
        format: {
          type: "fixedPoint",
          precision: 4
        },
      }, {
        caption: 'Deformación',
        dataField: 'deformacion',
        format: {
          type: "fixedPoint",
          precision: 4
        },
      }, {
        caption: 'Delta H',
        dataField: 'deltaH',
        format: {
          type: "fixedPoint",
          precision: 4
        },
      }],
      summary: {
        groupItems: [{
          column: 'esquina1',
          summaryType: 'sum',
          displayFormat: '{0}',
          valueFormat: {
            type: "fixedPoint",
            precision: 3
          },
          showInGroupFooter: false,
          alignByColumn: true,
        }, {
          column: 'esquina2',
          summaryType: 'sum',
          displayFormat: '{0}',
          valueFormat: {
            type: "fixedPoint",
            precision: 3
          },
          showInGroupFooter: false,
          alignByColumn: true,
        }, {
          column: 'centro',
          summaryType: 'sum',
          displayFormat: '{0}',
          valueFormat: {
            type: "fixedPoint",
            precision: 3
          },
          showInGroupFooter: false,
          alignByColumn: true,
        }, {
          column: 'deltaH',
          summaryType: 'sum',
          displayFormat: '{0} metros',
          valueFormat: {
            type: "fixedPoint",
            precision: 3
          },
          showInGroupFooter: false,
          alignByColumn: true,
        }],
      },
      showBorders: true,
      showColumnLines: true,
      showRowLines: true,
      columnAutoWidth: true,
      loadPanel: {
        enabled: true,
      },
      scrolling: {
        mode: 'standard',
      },
      paging: {
        enabled: false
      },
      columnFixing: {
        enabled: true,
      },
      grouping: {
        autoExpandAll: false,
      },
    });
  });
  //centro
  $(() => {
    $('#gridContainerCentro').dxDataGrid({
      dataSource: data,
      columns: [{
        caption: 'Capa',
        fixed: true,
        columns: [{
          caption: 'Inicio',
          dataField: 'inicio',
          format: {
            type: "fixedPoint",
            precision: 1
          },
        }, {
          caption: 'Fin',
          dataField: 'fin',
          format: {
            type: "fixedPoint",
            precision: 1
          },
        }]
      }, {
        caption: 'Profundidad',
        columns: [{
          caption: 'z',
          dataField: 'z',
          format: {
            type: "fixedPoint",
            precision: 2
          },
        }]
      }, {
        caption: 'A',
        columns: [{
          headerCellTemplate(container) {
            container.append($('<div>B<sup>2</sup> + L<sup>2</sup> + z<sup>2</sup> </div>'));
          },
          dataField: 'A',
          format: {
            type: "fixedPoint",
            precision: 2
          },
        }]
      }, {
        caption: 'C',
        columns: [{
          headerCellTemplate(container) {
            container.append($('<div>B<sup>2</sup> * L<sup>2</sup> / z<sup>2</sup> </div>'));
          },
          dataField: 'C',
          format: {
            type: "fixedPoint",
            precision: 2
          },
        }]
      }, {
        caption: 'Esquina',
        columns: [{
          caption: 'l',
          dataField: 'esquina',
          format: {
            type: "fixedPoint",
            precision: 2
          },
        }]
      }, {
        caption: 'Centro',
        columns: [{
          caption: 'Sum. l',
          dataField: 'centro',
          format: {
            type: "fixedPoint",
            precision: 2
          },
        }]
      }, {
        caption: 'Incremento Esfuerzo',
        dataField: 'incEsfuerzo',
        format: {
          type: "fixedPoint",
          precision: 4
        },
      }, {
        caption: 'Esfuerzo In Situ, kPa',
        dataField: 'esfuerzo',
        format: {
          type: "fixedPoint",
          precision: 4
        },
      }, {
        caption: 'Esfuerzo Final',
        dataField: 'esfuerzoFinal',
        format: {
          type: "fixedPoint",
          precision: 4
        },
      }, {
        caption: 'Variación e',
        dataField: 'variacionE',
        format: {
          type: "fixedPoint",
          precision: 4
        },
      }, {
        caption: 'Deformación',
        dataField: 'deformacion',
        format: {
          type: "fixedPoint",
          precision: 4
        },
      }, {
        caption: 'Delta H',
        dataField: 'deltaH',
        format: {
          type: "fixedPoint",
          precision: 4
        },
      }],
      showBorders: true,
      showColumnLines: true,
      showRowLines: true,
      allowColumnResizing: true,
      loadPanel: {
        enabled: true,
      },
      scrolling: {
        mode: 'standard',
      },
      paging: {
        enabled: false
      },
      columnFixing: {
        enabled: true,
      },
    });
  });

  //---------------------------------------
  //Gráficas --------------------------------------
  //---------------------------------------
  Highcharts.chart('container', {
    chart: {
      type: 'areaspline',
      height: charD.length * 20,
    },
    title: {
      text: 'Gráfico de Isobaras de incrementos de esfuerzo bajo el cimiento sometido a una carga Q'
    },
    xAxis: {
      categories: categories,
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    yAxis: {
      reversed: true
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        lineColor: '#ffffff',
        lineWidth: 1,
        marker:{
          enabled: false,
        },
        enableMouseTracking: false
      },
    },
    legend:{
      enabled: false
    },
    series: charD
  });
  Highcharts.chart('container2', {
    chart: {
        type: 'spline',
    },
    title: {
        text: 'DISTRIBUCIÓN DE ASENTAMIENTOS POR CONSOLIDACIÓN',
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Franjas del Cimiento'
        },
        maxPadding: 0.05,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Asentamientos Inmediatos (m)'
        },
        lineWidth: 2,
        reversed: true,
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.y:,.3f} m'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'Asentamiento',
        data: chartDataDeltaH
    }]
});
}

var selectorC = false
var selectorO = false
function selectCentro() {
  if (selectorC) {
    $('#nav-centro').removeClass('active')
    $('#puntoCentral').removeClass('active')
  } else {
    $('#nav-otros').removeClass('active')
    $('#puntoOtros').removeClass('active')
    $('#nav-centro').addClass('active')
    $('#puntoCentral').addClass('active')
  }
  selectorC = !selectorC
}
function selectOtros() {
  if (selectorO) {
    $('#nav-otros').removeClass('active')
    $('#puntoOtros').removeClass('active')
  } else {
    $('#nav-otros').addClass('active')
    $('#puntoOtros').addClass('active')
    $('#nav-centro').removeClass('active')
    $('#puntoCentral').removeClass('active')
  }
  selectorO = !selectorO
}
function suma(total, num) {
  return total + num;
}


