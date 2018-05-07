<template>
    <div class="calendar">
        <div class="calendar-header">
            <button @click="subtractMonth">-</button>
            <h4>{{ month + ' - ' + year}}</h4>
            <button @click="addMonth">+</button>
        </div>
        <ul class="weekdays">
            <li v-for="day in days">{{ day }}</li>
        </ul>
        <ul class="dates" v-for="item in gridArray">
            <li v-for="data in item">
                <a v-on:click="setDate(data)" v-bind:class="{'cal-selected':isActive(data)}">{{data.getDate()}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import moment from 'moment'
    export default {
        data() {
            return {
                today: moment(),
                dateContext: moment(),
                days: ['Pon', 'Wt', 'Sr', 'Czw', 'Pt', 'Sob', 'Nd'],
                filterDate: undefined,
                selectedDate: new Date(),
                currentMonthAndYear: ''
            }
        },
        methods: {
            addMonth() {
                var tmpDate = this.selectedDate,
                    tmpMonth = tmpDate.getMonth() + 1;

                this.selectedDate = new Date(tmpDate.setMonth(tmpMonth));
                this.currentMonthAndYear = moment(this.selectedDate).format('MMM YYYY');
                this.dateContext = moment(this.dateContext).add(1, 'month');
            },
            subtractMonth() {
                var tmpDate = this.selectedDate,
                    tmpMonth = tmpDate.getMonth() - 1;

                this.selectedDate = new Date(tmpDate.setMonth(tmpMonth));
                this.currentMonthAndYear = moment(this.selectedDate).format('MMM YYYY');
                this.dateContext = moment(this.dateContext).subtract(1, 'month');
            },
            setDate: function(date) {
                if (date == this.filterDate) {
                    console.log('setting undefined');
                    this.filterDate = undefined;
                    //unselected
                } else {
                    this.filterDate = date;
                }
            },
            isActive: function(date) {
                return date === this.filterDate;
            },
            getCalendarMatrix: function(date) {
                var calendarMatrix = [],
                    startDay = new Date(date.getFullYear(), date.getMonth(), 1),
                    lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

                // Modify the result of getDay so that we treat Monday = 0 instead of Sunday = 0
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
                    startDay.setDate(startDay.getDate() + 1)
                }
                return calendarMatrix;
            }
        },
        computed: {
            year() {
                return this.dateContext.format('Y');
            },
            month() {
                return this.dateContext.format('MMMM');
            },
            currentDate() {
                return this.dateContext.get('date')
            },
            firstDayOfMonth() {
                var firstDay = moment(this.dateContext).subtract((this.currentDate - 0), 'days');

                return firstDay.weekday();
            },
            initialDate() {
                return this.today.get('date');
            },
            initialMonth() {
                return this.today.format('MMMM');
            },
            initialYear() {
                return this.today.format('Y');
            },
                // a computed getter
            gridArray: function() {
                var grid = this.getCalendarMatrix(this.selectedDate);

                return grid;
            }
        }
    }
</script>

<style>
    .calendar {
        display: flex;
        flex-direction: column;
    }
    .weekdays {
        display: flex;
    }
    .calendar-header {
        display: flex;
    }
    .dates {
        display: flex;
    }
    ul li {
        margin: 0 25px;
        width: 5rem;
    }
    ul .dates {
        display: flex;
    }
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

a:hover {
    cursor: pointer;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.thead-default, .thead-default a {
  background-color: #00bcd4;
  color:#fff;
}

.tbody-default {
  background-color: #eee;
}

a {
  padding: 10px 10px 10px 10px
}

.center-title {
  text-align: center;
}

a.cal-selected,
a.cal-selected:focus {
  background-color: #368CB2;
  color: #fff;
  border-radius: 10px;
  font-weight: bold;
} */

</style>
