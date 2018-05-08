<template>
  <div class="calendar">
      <!-- <v-date-picker mode='single' v-model='selectedValue'></v-date-picker> -->
      <v-calendar is-expanded is-double-paned :attributes="attributes" @dayclick='dayClicked'></v-calendar>
      <div v-if='selectedDay' class='selected-day'>
        <h3>{{ selectedDay.dateTime.toTimeString() }}</h3>
        <ul>
          <li v-for='attr in selectedDay.attributes'>
            <!-- :key='attr.key' -->
            {{ attr.customData.description }}
          </li>
        </ul>
      </div>
  </div>
    <!-- Modal for add event -->
    <!-- <transition name="slide-backdrop">
      <div class="backdrop" v-if="addEvent"></div>
    </transition>
    <transition name="slide">
      <div class="modal" v-if="addEvent">
        <div class="modal-header">
          <h1 class="modal-title">Dodaj nowe wydarzenie</h1>
          <button class="modal-exit" @click="addNewEvent">&#10006;</button>
        </div>
        <div class="modal-email">
          <label class="modal-label">Podaj nazwę wydarzenia</label>
          <input class="input modal-input">
          <label class="modal-label">Podaj godzinę wydarzenia</label>
          <input class="modal-input" type="time">
        </div>
        <button class="button modal-button" type="button"><span class="span-arrow">Dodaj wdarzenie</span></button>
      </div>
    </transition> -->
    <!-- End modal for add event -->
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      // selectedValue: new Date(),
      selectedDay: null,
      todos: [
        {
          id: 1,
          description: 'Clean the house.',
          date: new Date(2018, 4, 15),
          isCompleted: false,
          color: 'red'
        },
        {
          id: 2,
          description: 'Meeting.',
          date: new Date(2018, 4, 15),
          isCompleted: false,
          color: 'green'
        }
      ],
      // attributes: [
      //   {
      //     highlight({ onStart }) {
      //       return {
      //         backgroundColor: 'orange',
      //         borderRadius: '10px'
      //       }
      //     },
      //     dates: new Date()
      //   }
      // ]
    };
  },
  computed: {
    attributes() {
      return this.todos.map(t => ({
        // key: 'todo.${t.id}',
        dot: {
          backgroundColor: t.color,
        },
        dates: t.date,
        customData: t,
        popover: {
          label: t.description
        }
      }));
    },
  },
  methods: {
    dayClicked(day) {
      this.selectedDay = day;
    },
  }
};
</script>

<style scoped>
.calendar {
  display: flex;
}

.selected-day {
  margin-left: 10px;
}
</style>
