const config = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Compare User Statistics'
    },
    subtitle:{
        text: ''
    },
    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of files'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'Before Deadline',
        data: [5, 3, 4, 7, 2]
    }, {
        name: 'After Deadline',
        data: [2, 2, 3, 2, 1]
    }]
}

const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export const getChartData = records => {

    let xcat = [];
    let after = [];
    let before = [];
    let startDate =``;
    let endDate = ``;
    let start;
    let end;

    records.forEach(rec => {
        
        let beforeTotal = 0;
        let afterTotal = 0;

        rec.record.sort((a,b) => {
            return a.month-b.month
          })
        rec.record.sort((a,b) => {
        return a.year-b.year
        })

        start = rec.record[0]
        end = rec.record[rec.record.length-1]
        startDate = `${month[start.month]} - ${start.year}`;
        endDate = `${month[end.month]} - ${end.year}`;
        rec.record.forEach( obj => {
            beforeTotal = obj.value + beforeTotal;
            afterTotal = obj.after + afterTotal;
        })



        xcat.push(rec.user.displayName);
        after.push(afterTotal);
        before.push(beforeTotal);
            
    })

    config.subtitle.text = `${startDate} to ${endDate}`
    config.xAxis.categories = xcat;
    config.series[0].data = before;
    config.series[1].data = after;
    if (start) config.startDate = start.year
    if(end) config.endDate = end.year
    return config
}



export const getChartDataByYear = (records, year) => {

    let xcat = [];
    let after = [];
    let before = [];
    let startDate =``;
    let endDate = ``;
    let start;
    let end;

    records.forEach(rec => {
        
        let beforeTotal = 0;
        let afterTotal = 0;

        rec.record.sort((a,b) => {
            return a.month-b.month
          })
        rec.record.sort((a,b) => {
            return a.year-b.year
        })

        let selected = rec.record.filter( each => {
            return each.year === year
        })


        start = selected[0]
        end = selected[selected.length-1]
        if(start)startDate = `${month[start.month]} - ${start.year}`;
        if(end)endDate = `${month[end.month]} - ${end.year}`;
        selected.forEach( obj => {
            beforeTotal = obj.value + beforeTotal;
            afterTotal = obj.after + afterTotal;
        })

        xcat.push(rec.user.displayName);
        after.push(afterTotal);
        before.push(beforeTotal);
            
    })

    config.subtitle.text = `${year}`
    config.xAxis.categories = xcat;
    config.series[0].data = before;
    config.series[1].data = after;
    if (start) config.startDate = start.year
    if(end) config.endDate = end.year
    return config
}