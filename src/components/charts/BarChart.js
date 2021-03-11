import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function() {
    return {
      alldata: {},
      datacollection: {
        labels: [],
        datasets: [{
          label: "Total",
          backgroundColor: ["#5f90ec", "#805db8", "#4ebe86", "#f0bdbc", "#bb5756", "rgb(243, 237, 201)"],
          data: [],
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Total Number of each dish'
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }],
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    fetchItems: function () {
      database
        .collection("orders")
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            for (const [key, value] of Object.entries(doc.data())) {
              if (key in this.alldata) {
                this.alldata[key] += value;
              } else {
                this.alldata[key] = value;
              }
            }
          });
          this.datacollection.labels = Object.keys(this.alldata)
          this.datacollection.datasets[0].data = Object.values(this.alldata)
          this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created() {
    this.fetchItems()
  }
}