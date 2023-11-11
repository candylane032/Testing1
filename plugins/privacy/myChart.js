$(document).ready(function(){
    chartToday();
    chartDaily();
    chartMonthly();
    setInterval(function() {
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
            var dataValues = chartdata.map(row => row.reserve_kilo);
            var highestValue = Math.max(...dataValues);
            
            var ctx = document.getElementById('myChartToday').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartdata.map(row => row.pname),
                    datasets: [{
                        label: 'Sales Today [' + chartdata[0].Date + ']',
                        data: dataValues,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        pointRadius: 4,  
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
                    }],
                    
                },
                options: {
                    scales: {
                        y: {
                            suggestedMin: 0,
                            suggestedMax: highestValue
                        },
                    }
                }
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
};

var chartDaily = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'chartDaily' },
        success: function (data) {
            var chartdata = JSON.parse(data);
            var dataValues = chartdata.map(row => row.reserve_kilo);
            var highestValue = Math.max(...dataValues);

            var ctx = document.getElementById('myChartDaily').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartdata.map(row => row.Date),
                    datasets: [{
                        label: 'Daily Sales',
                        data: dataValues,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        pointRadius: 4,  
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
                    }]
                },
                options: {
                    scales: {
                        y: {
                            suggestedMin: 0,
                            suggestedMax: highestValue
                        },
                    }
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
            var dataValues = chartdata.map(row => row.reserve_kilo);
            var highestValue = Math.max(...dataValues);

            var ctx = document.getElementById('myChartMonthly').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartdata.map(row => row.Date),
                    datasets: [{
                        label: 'Monthly Sales',
                        data: dataValues,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        pointRadius: 4,  
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
                    }]
                },
                options: {
                    scales: {
                        y: {
                            suggestedMin: 0,
                            suggestedMax: highestValue
                        },
                    }
                }
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
};

