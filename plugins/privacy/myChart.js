$(document).ready(function () {
    chartToday();
    chartDaily();
    chartMonthly();
    setInterval(function () {
        chart();
    }, 24 * 60 * 60 * 1000);
});

var chartToday = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'chartToday' },
        success: function (data) {
            var chartdata = JSON.parse(data);
            var dataValues = chartdata.map(row => row.combined_total);
            var highestValue = Math.max(...dataValues);
            var currentDate = new Date();
            var dateInWords = formatDateInWords(currentDate);

            var ctx = document.getElementById('myChartToday').getContext('2d');

            ctx.canvas.width = 600;
            ctx.canvas.height = 600;

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartdata.map(row => row.pname),
                    datasets: [{
                        label: 'Sales Today: ' + dateInWords + '',
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
                        y: {
                            suggestedMin: 10,
                            suggestedMax: highestValue,
                            ticks: {
                                color: 'white'
                            }
                        },

                        x: {
                            ticks: {
                                color: 'white'
                            }
                        }
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
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
};

function formatDateInWords(date) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}



var chartDaily = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'chartDaily' },
        success: function (data) {
            var chartdata = JSON.parse(data);
            var dataValues = chartdata.map(row => row.combined_total);
            var highestValue = Math.max(...dataValues);

            var ctx = document.getElementById('myChartDaily').getContext('2d');

            ctx.canvas.width = 600;
            ctx.canvas.height = 600;

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartdata.map(row => row.Date),
                    datasets: [{
                        label: 'Daily Sales',
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
                        y: {
                            suggestedMin: 0,
                            suggestedMax: highestValue,
                            ticks: {
                                color: 'white'
                            }
                        },

                        x: {
                            ticks: {
                                color: 'white'
                            }
                        }
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
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
};

var chartMonthly = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'chartMonthly' },
        success: function (data) {
            var chartdata = JSON.parse(data);
            var dataValues = chartdata.map(row => row.combined_total);
            var highestValue = Math.max(...dataValues);

            var ctx = document.getElementById('myChartMonthly').getContext('2d');

            ctx.canvas.width = 600;
            ctx.canvas.height = 600;
            
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartdata.map(row => row.Date),
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
                        y: {
                            suggestedMin: 0,
                            suggestedMax: highestValue,
                            ticks: {
                                color: 'white'
                            }
                        },

                        x: {
                            ticks: {
                                color: 'white'
                            }
                        }
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
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
};