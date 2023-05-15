import { DeficiencyService } from '@/services'

class ChartConfig {
  private static async getDeficienciesNames() {
    const names: string[] = []

    const deficiencies = await DeficiencyService.getAll()

    deficiencies.forEach((dependency) => {
      names.push(dependency.name)
    })

    return names
  }

  static async getDeficiencies() {
    return {
      labels: this.getDeficienciesNames(),
      datasets: [
        {
          backgroundColor: [
            '#0EA7C7',
            '#0FD1BE',
            '#16B97A',
            '#0FD150',
            '#0EC717',
          ],
          data: [40, 20, 80, 10, 50],
        },
      ],
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
