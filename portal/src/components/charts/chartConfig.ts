class ChartConfig {
  static getDeficiencies() {
    return {
      labels: ['Autismo', 'Audição', 'Visão', 'Motora', 'Síndrome de Down'],
      datasets: [
        {
          backgroundColor: ['#0EA7C7', '#0FD1BE', '#16B97A', '#0FD150', '#0EC717'],
          data: [40, 20, 80, 10, 50]
        }
      ]
    } 
  }

  static getOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
    }
  }
}

export default ChartConfig
  