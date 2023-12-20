$(document).ready(function () {
    // chartToday();
    // chartDaily();
    chartMonthly();
    setInterval(function () {
        chart();
    }, 24 * 60 * 60 * 1000);
});

// $(document).ready(function () {
//     chartToday();
//     chartDaily();
//     chartMonthly(currentPage);
//     setInterval(function () {
//         chart();
//     }, 24 * 60 * 60 * 1000);
// });

// var chartToday = () => {
//     $.ajax({
//         type: "POST",
//         url: "../../routes/router.php",
//         data: { choice: 'chartToday' },
//         success: function (data) {
//             var chartdata = JSON.parse(data);

//             chartdata.sort((a, b) => new Date(a.Date) - new Date(b.Date));

//             var dataValues = chartdata.map(row => row.combined_total);
//             var dataValuesDate = chartdata.map(row => row.Date);
//             var highestValue = Math.max(...dataValues);
//             var currentDate = new Date();
//             var dateInWords = formatDateInWords(currentDate);

//             var ctx = document.getElementById('myChartToday').getContext('2d');

//             ctx.canvas.width = 600;
//             ctx.canvas.height = 600;


//             new Chart(ctx, {
//                 type: 'bar',
//                 data: {
//                     labels: chartdata.map(row => row.pname),
//                     datasets: [{
//                         label: 'Sales Today: ' + dateInWords + '',
//                         data: dataValues,
//                         backgroundColor: '#9ed3fe',
//                         borderColor: '#55d6ff',
//                         borderWidth: 1,
//                         pointRadius: 6,
//                         pointBackgroundColor: '#4bc0c0',
//                         pointBorderColor: '#fff',
//                         pointHoverRadius: 8,
//                         pointHoverBackgroundColor: '#4bc0c0',
//                         pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
//                     }]
//                 },
//                 options: {
//                     scales: {
//                         x: {
//                             type: 'category',
//                             ticks: {
//                                 color: 'white',
//                                 maxTicksLimit: 12,
//                             }
//                         },
//                         y: {
//                             suggestedMin: 0,
//                             suggestedMax: highestValue,
//                             ticks: {
//                                 color: 'white'
//                             }
//                         },
//                     },
//                     plugins: {
//                         legend: {
//                             labels: {
//                                 color: 'white'
//                             },
//                             margin: {
//                                 bottom: 20
//                             }
//                         }
//                     },
//                     layout: {
//                         padding: {
//                             left: 10,
//                             right: 10,
//                             top: 5,
//                             bottom: 5
//                         },
//                     },
//                 }
//             });
//         },
//         error: function (xhr, ajaxOptions, thrownError) {
//             alert(thrownError);
//         }
//     });
// };

// function formatDateInWords(date) {
//     var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     return date.toLocaleDateString('en-US', options);
// }



// var chartDaily = () => {
//     $.ajax({
//         type: "POST",
//         url: "../../routes/router.php",
//         data: { choice: 'chartDaily' },
//         success: function (data) {
//             var chartdata = JSON.parse(data);

//             chartdata.sort((a, b) => new Date(b.Date) - new Date(a.Date));

//             chartdata = chartdata.slice(0, 12);

//             var dataValues = chartdata.map(row => row.combined_total);
//             var dataValuesDate = chartdata.map(row => row.Date);
//             var highestValue = Math.max(...dataValues);

//             var ctx = document.getElementById('myChartDaily').getContext('2d');

//             ctx.canvas.width = 600;
//             ctx.canvas.height = 600;

//             new Chart(ctx, {
//                 type: 'bar',
//                 data: {
//                     labels: chartdata.map(row => row.Date),
//                     datasets: [{
//                         label: 'Daily Sales',
//                         data: dataValues,
//                         backgroundColor: '#9ed3fe',
//                         borderColor: '#55d6ff',
//                         borderWidth: 1,
//                         pointRadius: 6,
//                         pointBackgroundColor: '#4bc0c0',
//                         pointBorderColor: '#fff',
//                         pointHoverRadius: 8,
//                         pointHoverBackgroundColor: '#4bc0c0',
//                         pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
//                     }]
//                 },
//                 options: {
//                     scales: {
//                         x: {
//                             type: 'category',
//                             ticks: {
//                                 color: 'white',
//                                 maxTicksLimit: 12,
//                             }
//                         },
//                         y: {
//                             suggestedMin: 0,
//                             suggestedMax: highestValue,
//                             ticks: {
//                                 color: 'white'
//                             }
//                         },
//                     },
//                     plugins: {
//                         legend: {
//                             labels: {
//                                 color: 'white'
//                             },
//                             margin: {
//                                 bottom: 20
//                             }
//                         }
//                     },
//                     layout: {
//                         padding: {
//                             left: 10,
//                             right: 10,
//                             top: 5,
//                             bottom: 5
//                         },
//                     },
//                 }
//             });
//         },
//         error: function (xhr, ajaxOptions, thrownError) {
//             alert(thrownError);
//         }
//     });
// };


var currentPage = 1;
    var itemsPerPage = 12;
    var totalPages;

    function updatePaginationUI(currentPage, totalPages) {
        var paginationContainer = $('#pagination');
        paginationContainer.empty();
    
    }

    function chartMonthly(pageNumber) {
        $.ajax({
            type: "POST",
            url: "../../routes/router.php",
            data: { choice: 'chartMonthly' },
            success: function (data) {
                var chartdata = JSON.parse(data);
    
          
                chartdata.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    
                totalPages = Math.ceil(chartdata.length / itemsPerPage);
    
                var startIndex = (pageNumber - 1) * itemsPerPage;
                var endIndex = startIndex + itemsPerPage;
    
                chartdata = chartdata.slice(startIndex, endIndex);
    
                var dataValues = chartdata.map(row => row.combined_total);
                var dataValuesDate = chartdata.map(row => row.Date);
                var highestValue = Math.max(...dataValues);
    
                var ctx = document.getElementById('myChartMonthly').getContext('2d');

if (ctx) {
    if (window.myChart) {
        window.myChart.destroy();
    }

    ctx.canvas.width = 600;
    ctx.canvas.height = 600;

    var reversedLabels = chartdata.map(row => row.Date);

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: reversedLabels,
            datasets: [{
                label: 'Monthly Sales',
                data: dataValues, 
                backgroundColor: '#9ed3fe',
                borderColor: '#55d6ff',
                borderWidth: 1,
                pointRadius: 6,
                pointBackgroundColor: '#4bc0c0',
                pointBorderColor: '#fff',
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#4bc0c0',
                pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'category',
                    ticks: {
                        color: 'white',
                        maxTicksLimit: 12,
                    }
                },
                y: {
                    suggestedMin: 0,
                    suggestedMax: highestValue,
                    ticks: {
                        color: 'white'
                    }
                },
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    },
                    margin: {
                        bottom: 20
                    }
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 5
                },
            },
        }
    });
    
                    updatePaginationUI(pageNumber, totalPages);
                } else {
                    console.error("Canvas context is null.");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
    }
    
    $('#nextBtn').on('click', function () {
        if (currentPage < totalPages) {
            currentPage++;
            chartMonthly(currentPage);
        }
    });
    
    $('#prevBtn').on('click', function () {
        if (currentPage > 1) {
            currentPage--;
            chartMonthly(currentPage);
        }
    });
    