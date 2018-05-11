<template>
  <div class="calendar">
    <v-date-picker mode='single' :min-date="new Date()" v-model="selectedValue" :attributes="attributes" is-inline @dayclick='dayClicked'>
    </v-date-picker>
    <!-- <v-calendar is-expanded is-double-paned :attributes="attributes" @dayclick='dayClicked'></v-calendar> -->
    <div v-if='selectedDay' class='selected-day'>
      <h3>{{ selectedDay.date.toDateString() }}</h3>
      <button @click="performDialog">+</button>
      <ul>
        <li v-for='attr in selectedDay.attributes' :key='attr.customData.eventName'>
        <!-- <li v-for="attr in todos"> -->
          <!-- :key='attr.key' -->
          {{ attr.customData.eventName }}, {{ attr.customData.time }}: {{ attr.customData.description }}
          <!-- <slot v-bind:attr="attr">
            {{ attr.customData.eventName }}, {{ attr.customData.time }}: {{ attr.customData.description }}
          </slot> -->
          <!-- {{ attr.eventName }}, {{ attr.time }}: {{ attr.description }} -->
        </li>
       </ul>
    </div>
  <!-- Modal for add event -->
    <transition name="slide-backdrop">
      <div class="backdrop" v-if="dialogEvent"></div>
    </transition>
    <transition name="slide">
      <div class="modal" v-if="dialogEvent">
        <div class="modal-header">
          <h1 class="modal-title">Dodaj nowe wydarzenie</h1>
          <button class="modal-exit" @click="performDialog">&#10006;</button>
        </div>
        <div class="modal-email">
          <label class="modal-label">Podaj nazwę wydarzenia</label>
          <input class="input modal-input" v-model="eventName" @blur="$v.eventName.touch()">
          <label class="modal-label">Podaj godzinę wydarzenia</label>
          <input class="modal-input" type="time" v-model="eventTime" @blur="$v.eventTime.touch()">
          <label class="modal-label">Podaj opis wydarzenia</label>
          <input class="input modal-input" v-model="eventDescription">
          <label class="modal-label">Priorytet</label>
          <select @change="checkPriority" v-model="priority">
            <option>Wysoki</option>
            <option>Średni</option>
            <option>Niski</option>
          </select>
          <label class="modal-label">Typ wydarzenia</label>
          <select>
            <option>Szkolenie</option>
            <option>Impreza integracyjna</option>
          </select>
        </div>
        <button :disabled="$v.$invalid" class="button modal-button" type="button" @click="addNewEvent"><span class="span-arrow">Dodaj wydarzenie</span></button>
      </div>
    </transition>
  <!-- End modal for add event -->
  </div>
</template>

<script>
import moment from "moment";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      selectedValue: null,
      selectedDay: null,
      dialogEvent: false,
      todos: [
        {
          id: 1,
          description: 'Clean the house.',
          // date: new Date(2018, 4, 15),
          dates: {
            start: new Date('1/1/2018'),
            monthlyInterval: 2,           // Every other month
            ordinalWeekdays: { [-1]: 6 }  // ...on the last Friday
          },
          isCompleted: false,
          color: 'red'
        },
        {
          id: 2,
          description: 'Meeting.',
          date: new Date(2018, 4, 15),
          isCompleted: false,
          color: 'pink'
        }
      ],
      eventDescription: '',
      eventTime: null,
      eventName: '',
      priority: ''
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
  validations: {
    eventName: {
      required
    },
    eventTime: {
      required
    }
  },
  computed: {
    attributes() {
      return this.todos.map(t => ({
        // key: 'todo.${t.id}',
        time: t.eventTime,
        eventName: t.eventName,
        dot: {
          backgroundColor: t.color
        },
        dates: t.date,
        customData: t,
        popover: {
          label: t.description
        }
      }));
    },
    eventColor() {
      return this.$store.getters.priorityColor;
    }
  },
  methods: {
    dayClicked(day) {
      this.selectedDay = day;
    },
    performDialog() {
      this.dialogEvent = !this.dialogEvent;
    },
    addNewEvent() {
      var oEvent = {
        description: this.eventDescription,
        date: new Date(this.selectedValue.getFullYear(), this.selectedValue.getMonth(), this.selectedValue.getDate()),
        color: this.eventColor,
        time: this.eventTime,
        eventName: this.eventName
      };
      this.todos.push(oEvent);
      this.performDialog();
      // this.dayClicked(this.selectedDay);
    },
    checkPriority() {
      console.log(this.priority);
      this.$store.dispatch("setColorPriority", {
        priority: this.priority
      });
    }
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

.selected-day ul li:first-child {
  margin-top: 10px;
}
.selected-day ul li {
  margin-bottom: 10px;
}
</style>
