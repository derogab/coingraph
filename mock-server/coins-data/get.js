const btc_data = {
    'data1': 'data1',
    'data2': 'data2',
    'data3': 'data3',
    'data4': 'data4'
  }
  const btc_graph = [
    {"name": "Coingraph", "uv": 0, "pv": 0, "amt": 0},
    {"name": "Coingraph", "uv": 100, "pv": 100, "amt": 100},
    {"name": "Coingraph", "uv": 80, "pv": 80, "amt": 80}
  ];
  
  const eth_data = {
    'data1': 'data1',
    'data2': 'data2',
    'data3': 'data3',
    'data4': 'data4'
  }
  const eth_graph = [
    {"name": "Coingraph", "uv": 0, "pv": 0, "amt": 0},
    {"name": "Coingraph", "uv": 100, "pv": 100, "amt": 100},
    {"name": "Coingraph", "uv": 50, "pv": 50, "amt": 50}
  ];

module.exports = (req, res) => {
    res.send({
        btc_data,
        btc_graph,
        eth_data,
        eth_graph
    })
}