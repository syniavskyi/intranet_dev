<template>
    <div class="calendar">
        <transition name="fade">
            <div class="alert alert-success" v-if="filterDate != undefined"> Date selected is: {{formattedDate}}</div>
        </transition>
        <div class="calendar-header">
            <div><button @click="subtractMonth">-</button></div>
            <div><h4>{{ month + ' - ' + year}}</h4></div>
            <div><button @click="addMonth">+</button></div>
        </div>
        <ul class="weekdays">
            <li v-for="day in days">{{ day }}</li>
        </ul>
        <ul class="dates" v-for="item in gridArray">
            <li class="days" v-for="data in item">
                <!-- <a v-on:click="setDate(data)" v-bind:class="{'cal-selected':isActive(data)}">{{data.getDate()}}</a> -->
                <button @click="setDate(data)" :class="{'cal-selected':isActive(data)}">{{data.getDate()}}</button>
            </li>
        </ul>
    </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      today: moment(),
      dateContext: moment(),
      days: ["Pon", "Wt", "Sr", "Czw", "Pt", "Sob", "Nd"],
      filterDate: undefined,
      selectedDate: new Date()
    };
  },
  methods: {
    addMonth() {
      var tmpDate = this.selectedDate,
        tmpMonth = tmpDate.getMonth() + 1;

      this.selectedDate = new Date(tmpDate.setMonth(tmpMonth));
      this.dateContext = moment(this.dateContext).add(1, "month");
    },
    subtractMonth() {
      var tmpDate = this.selectedDate,
        tmpMonth = tmpDate.getMonth() - 1;

      this.selectedDate = new Date(tmpDate.setMonth(tmpMonth));
      this.dateContext = moment(this.dateContext).subtract(1, "month");
    },
    setDate(date) {
      if (date == this.filterDate) {
        this.filterDate = undefined;
        //unselected
      } else {
        this.filterDate = date;
      }
    },
    isActive(date) {
      return date === this.filterDate;
    },
    getCalendarMatrix(date) {
      var calendarMatrix = [],
        startDay = new Date(date.getFullYear(), date.getMonth(), 1),
        lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    //   Modify the result of getDay so that we treat Monday = 0 instead of Sunday = 0
      var startDow = (startDay.getDay() + 6) % 7,
        endDow = (lastDay.getDay() + 6) % 7;

      // If the month didn't start on a Monday, start from the last Monday of the previous month
      startDay.setDate(startDay.getDate() - startDow);

      // If the month didn't end on a Sunday, end on the following Sunday in the next month
      lastDay.setDate(lastDay.getDate() + (6 - endDow));

      var week = [];
      while (startDay <= lastDay) {
        week.push(new Date(startDay));
        if (week.length === 7) {
          calendarMatrix.push(week);
          week = [];
        }
        startDay.setDate(startDay.getDate() + 1);
      }
      return calendarMatrix;
    }
  },
  computed: {
    year() {
      return this.dateContext.format("Y");
    },
    month() {
      return this.dateContext.format("MMMM");
    },
    currentDate() {
      return this.dateContext.get("date");
    },
    firstDayOfMonth() {
      var firstDay = moment(this.dateContext).subtract(
        this.currentDate - 0,
        "days"
      );

      return firstDay.weekday();
    },
    initialDate() {
      return this.today.get("date");
    },
    initialMonth() {
      return this.today.format("MMMM");
    },
    initialYear() {
      return this.today.format("Y");
    },
    // a computed getter
    gridArray() {
      var grid = this.getCalendarMatrix(this.selectedDate);

      return grid;
    },
    formattedDate: function() {
      return this.filterDate ? moment(this.filterDate).format("lll") : "";
    }
  }
};
</script>

<style>
li.notMonth {
  background-color: black;
}
.calendar {
  display: flex;
  flex-direction: column;
  margin-left: 25px;
}
.weekdays {
  display: flex;
  background-color: #00bcd4;
  color: #fff;
  border: 0.5px solid #aaa;
  border-bottom: 0px;
  border-left: 0px;
  text-align: center;
}
.weekdays li {
  border-left: 0.5px solid #aaa;
}
.calendar-header {
  display: flex;
  flex-direction: row;
}
.calendar-header div {
  margin-top: 25px;
  display: flex;
  background-color: #00bcd4;
  color: #fff;
}
.dates {
  display: flex;
  background-color: #eee;
  border: 0.5px solid #aaa;
  border-bottom: 0px;
  border-left: 0px;
  text-align: center;
}
ul li {
  width: 5rem;
  padding: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
button.cal-selected,
button.cal-selected:focus {
  background-color: orange;
  color: #fff;
  border-radius: 10px;
  font-weight: bold;
}
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.days button:hover {
  border-bottom: 1px solid orange;
}
.dates:last-child {
  border-bottom: 0.5px solid #aaa;
}
.dates li {
  border-left: 0.5px solid #aaa;
}
</style>
