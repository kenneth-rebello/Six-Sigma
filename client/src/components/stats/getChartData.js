const config = {
    chart: {
      type: "line"
    },
    title: {
      text: "",
      style:{
        fontFamily: 'Roboto',
        fontSize: '1.35rem',
        color:'#1c1546'
      }
    },
    xAxis: {
      
    },
    yAxis: {
      title: {
        text: "Percentage"
      }
    },
    
    series: [
        {
          name: "",
          lineWidth: 1,
          
          dataLabels: {
            enabled: false
          }
        }
    ],
        
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        pointStart: 0
      }
    }
};

const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; 

export const getChartData = (data) => {
    
    if(data && data.record){
        let points = [];
        let xcat = [];

        data.record.sort((a,b) => {
          return a.month-b.month
        })
        data.record.sort((a,b) => {
          return a.year-b.year
        })

        data.record.forEach(obj => {
            points.push(obj.value);
            let period = `${month[obj.month]} - ${obj.year}`
            xcat.push(period)
        });

        config.title.text = `Number of files cleared by ${data.user.displayName}`
        config.series[0].data = points;
        config.xAxis.categories = xcat;
        
        return config;
    }

}