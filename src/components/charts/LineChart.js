import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
      results: [],
      datacollection: {
        labels: [],
        datasets: [{
          label: '',
          borderColor: 'red',
          data: [],
          fill: false
        }, {
          label: '',
          borderColor: "#5f90ec",
          data: [],
          fill: false
        }, {
          label: '',
          borderColor: "#323d7c",
          data: [],
          fill: false
        }, {
          label: '',
          borderColor: "#2ebef7",
          data: [],
          fill: false
        }, {
          label: '',
          borderColor: "#826196",
          data: [],
          fill: false
        }, {
          label: '',
          borderColor: "#a0f798",
          data: [],
          fill: false
        }]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'PSI Twenty Four Hourly (By Region)'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    fetchItems: function () {
      axios.get('https://api.data.gov.sg/v1/environment/psi?date=2021-02-23')
        .then(response => {
          var regions = response.data.region_metadata
          for (let i = 0; i < regions.length; i++) {
            this.datacollection.datasets[i].label = regions[i].name;
          }
          this.results = response.data.items
          this.results.forEach(result => {
            this.datacollection.labels.push(result.timestamp)
            this.datacollection.datasets[0].data.push(result.readings.psi_twenty_four_hourly.west)
            this.datacollection.datasets[1].data.push(result.readings.psi_twenty_four_hourly.national)
            this.datacollection.datasets[2].data.push(result.readings.psi_twenty_four_hourly.east)
            this.datacollection.datasets[3].data.push(result.readings.psi_twenty_four_hourly.central)
            this.datacollection.datasets[4].data.push(result.readings.psi_twenty_four_hourly.south)
            this.datacollection.datasets[5].data.push(result.readings.psi_twenty_four_hourly.north)
          });
          this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created() {
    this.fetchItems()
  }
}