const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

// Set default currency
var change_btc = 'usd';
var change_eth = 'usd';
$('#btc-to-usd').addClass('btn-primary').removeClass('btn-default');
$('#eth-to-usd').addClass('btn-primary').removeClass('btn-default');

// Set onclick button
$('#btc-to-usd').click(function(){
  change_btc = 'usd';
  $('#btc-to-usd').addClass('btn-primary').removeClass('btn-default');
  $('#btc-to-eur').addClass('btn-default').removeClass('btn-primary');
});
$('#btc-to-eur').click(function(){
  change_btc = 'eur';
  $('#btc-to-eur').addClass('btn-primary').removeClass('btn-default');
  $('#btc-to-usd').addClass('btn-default').removeClass('btn-primary');
});
$('#eth-to-usd').click(function(){
  change_eth = 'usd';
  $('#eth-to-usd').addClass('btn-primary').removeClass('btn-default');
  $('#eth-to-eur').addClass('btn-default').removeClass('btn-primary');
});
$('#eth-to-eur').click(function(){
  change_eth = 'eur';
  $('#eth-to-eur').addClass('btn-primary').removeClass('btn-default');
  $('#eth-to-usd').addClass('btn-default').removeClass('btn-primary');
});

// Start build graphs
setInterval(function(){

var allDataBTC = new Array();
$.ajax({
    url: "getdata.php?base=btc&change="+change_btc,
    dataType: "JSON",
    success: function(json){
        //here inside json variable you've the json returned by your PHP
        var btc = json.btc;
        var data = Object.keys(btc).map(function(e) {
          return [Number(e), btc[e]];
        });
        data.forEach(function(element) {
          element[1]['price'] = parseFloat(element[1]['price']);
          allDataBTC.push(element[1]);
        });

        // Insert current value
        document.getElementById('btc-value').innerHTML = "<i class='fa fa-"+change_btc+"' aria-hidden='true'></i> "+(Number((allDataBTC[(allDataBTC.length)-1]['price']).toFixed(2)));

        // Insert border color
        if (allDataBTC[(allDataBTC.length)-1]['price'] > allDataBTC[(allDataBTC.length)-2]['price']) {
          $('#btc-value').addClass('green').removeClass('red');
        }
        else if (allDataBTC[(allDataBTC.length)-1]['price'] < allDataBTC[(allDataBTC.length)-2]['price']) {
          $('#btc-value').addClass('red').removeClass('green');
        }

        // Calculate average value
        var sum = 0;
        for (var i = 0; i < allDataBTC.length; i++) {
          sum += allDataBTC[i]['price'];
        }
        var average = sum/i;

        // Insert average value
        document.getElementById('btc-average').innerHTML = "<i class='fa fa-"+change_btc+"' aria-hidden='true'></i> "+(Number(average).toFixed(2));

        // Calculate the percentage increase/decrease over the percentage
        var diff = allDataBTC[(allDataBTC.length)-1]['price'] - average;
        // percentage : 100 = diff : average
        var percentage = (100*diff)/average;

        // Insert percentage value
        document.getElementById('btc-percentage').innerHTML = (Number(percentage).toFixed(2)+"%");
        
        // Insert border color
        if (percentage > 0) {
          $('#btc-percentage').addClass('border-green').removeClass('border-red');
        }
        else if (allDataBTC[(allDataBTC.length)-1]['price'] < allDataBTC[(allDataBTC.length)-2]['price']) {
          $('#btc-percentage').addClass('border-red').removeClass('border-green');
        }

        // Build graph
        var ChartBTC = React.createClass({
        	render () {
          	return (
              <LineChart width={$('#btc-graph').width()} height={$('#btc-graph').height()} data={allDataBTC} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
                <XAxis dataKey="time" hide={true}/>
                <YAxis hide={true} domain={['auto', 'auto']}/>
                <Line type="monotone" dataKey="price" stroke="#f1c40f" dot={false} isAnimationActive={false}/>
              </LineChart>
            );
          }
        });

        ReactDOM.render(
          <ChartBTC />,
          document.getElementById('btc-graph')
        );

    }
})

var allDataETH = new Array();
$.ajax({
    url: "getdata.php?base=eth&change="+change_eth,
    dataType: "JSON",
    success: function(json){
        //here inside json variable you've the json returned by your PHP
        var eth = json.eth;
        var data = Object.keys(eth).map(function(e) {
          return [Number(e), eth[e]];
        });
        data.forEach(function(element) {
          element[1]['price'] = parseFloat(element[1]['price']);
          allDataETH.push(element[1]);
        });

        // Insert current value
        document.getElementById('eth-value').innerHTML = "<i class='fa fa-"+change_eth+"' aria-hidden='true'></i> "+(Number((allDataETH[(allDataETH.length)-1]['price']).toFixed(2)));

        // Insert border color
        if (allDataETH[(allDataETH.length)-1]['price'] > allDataETH[(allDataETH.length)-2]['price']) {
          $('#eth-value').addClass('green').removeClass('red');
        }
        else if (allDataETH[(allDataETH.length)-1]['price'] < allDataETH[(allDataETH.length)-2]['price']) {
          $('#eth-value').addClass('red').removeClass('green');
        }

        // Calculate average value
        var sum = 0;
        for (var i = 0; i < allDataETH.length; i++) {
          sum += allDataETH[i]['price'];
        }
        var average = sum/i;

        // Insert average value
        document.getElementById('eth-average').innerHTML = "<i class='fa fa-"+change_eth+"' aria-hidden='true'></i> "+(Number(average).toFixed(2));

        // Calculate the percentage increase/decrease over the percentage
        var diff = allDataETH[(allDataETH.length)-1]['price'] - average;
        // percentage : 100 = diff : average
        var percentage = (100*diff)/average;

        // Insert percentage value
        document.getElementById('eth-percentage').innerHTML = (Number(percentage).toFixed(2)+"%");
        
        // Insert border color
        if (percentage > 0) {
          $('#eth-percentage').addClass('border-green').removeClass('border-red');
        }
        else if (allDataETH[(allDataETH.length)-1]['price'] < allDataETH[(allDataETH.length)-2]['price']) {
          $('#eth-percentage').addClass('border-red').removeClass('border-green');
        }

        // Build graph
        var ChartETH = React.createClass({
        	render () {
          	return (
              <LineChart width={$('#eth-graph').width()} height={$('#eth-graph').height()} data={allDataETH} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
                <XAxis dataKey="time" hide={true}/>
                <YAxis hide={true} domain={['auto', 'auto']}/>
                <Line type="monotone" dataKey="price" stroke="#3498db" dot={false} isAnimationActive={false}/>
              </LineChart>
            );
          }
        });

        ReactDOM.render(
          <ChartETH />,
          document.getElementById('eth-graph')
        );

    }
})

}, 3000);
