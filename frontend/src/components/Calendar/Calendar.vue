<template>
  <div>
    <div></div>
    <div id="day-bar">
      <div>Pon</div><div>Wt</div><div>Sr</div><div>Czw</div><div>Pt</div><div>Sob</div><div>Nd</div>
    </div>
    <div id="calendar">
      <!-- <div v-for="week in weeks">
        <div>
          
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";

// Moment
import moment from "moment-timezone";
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, "$moment", {
  get() {
    return this.$root.moment;
  }
});
//End of Moment

export default {
  data() {
    return {
      moment
    };
  },
  methods: {
    getFirstMonday(year, month) {
      let firstDay = this.$moment('${year}-${month}-01', "YYYY-M-DD"),
          dayNum = firstDay.day();

          dayNum = (dayNum - 1) < 0 ? 6 : (dayNum - 1);

          return firstDay.subtract(dayNum, 'days');
    },
    notLastWeekOfMonth(lastDayOfWeek) {
      let lastDayOfWeekIsInThisMonth = (this.$moment(lastDayOfWeek).month() + 1) === this.month,
          lastDayOfWeekIsNotLastDayOfMonth = this.$moment(lastDayOfWeek).isSame(this.$moment(lastDayOfWeek).add(1, 'days'), 'month');
      
      return lastDayOfWeekIsInThisMonth && lastDayOfWeekIsNotLastDayOfMonth;
    }
  },
  computed: {
    year() {
      return this.$store.state.currentYear;
    },
    month() {
      return this.$store.state.currentMonth;
    },
    weeks() {
      let day,
          weeks = [];
      
      do {
        let week = [];

        for(let i = 0; i < 7; i++) {
          if(day === undefined) {
            day = this.getFirstMonday(this.year, this.month);
          } else {
            day = this.$moment(day).add(1, 'days');
          }
          week.push(day);
        }
        weeks.push(week);
      } while (this.notLastWeekOfMonth(weeks[weeks.length - 1][6]));
      return weeks;
    }
  }
};
</script>

<style>
#day-bar > div {
  flex-direction: row;
  margin: 5rem 4rem;
  align-items: center;
}
#day-bar {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
</style>
