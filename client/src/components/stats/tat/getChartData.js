const config = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Average Turn Around Time'
    },
    subtitle: {
        text: 'For Department A'
    },
    xAxis: {
        
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Time (hrs)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} hours</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        },
        series: {
            color: 'teal'
        }
    },
    series: [{
        name: 'Turn Around Time',
        data: []

    }],
    legend:{
        enabled: false
    }
}

export const getChartData = (data) => {

    let xcat = []
    let tat = []
    data.forEach(obj=>{
        xcat.push(obj.name);
        
        let total = 0;
        obj.tatArray.forEach(time => {
            total = time + total
        });

        let avg = total/obj.tatArray.length;

        tat.push(avg);
    })

    config.xAxis.categories = xcat;
    config.series[0].data = tat;
    return config
}