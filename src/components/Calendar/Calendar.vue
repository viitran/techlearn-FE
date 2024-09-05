<template>
  <div class="calendar-container">
    <div class="demo-app-main">
      <FullCalendar class="app-calendar" :options="calendarOption">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
          <br />
          <i>{{ arg.event.note}}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
  <ModalUpdate
  :titles="titles"
  :notes="notes"
  @confirmUpdate="confirms"
  @close="closeModal"
/>

</template>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ModalUpdate from "../Modal/ModalUpdate.vue";
import { onMounted, ref } from "vue";
import axios from "axios";

const initialEvents = ref([]);
const myModal = ref(null);
const titles = ref("");
const notes = ref("");
const selectedInfos = ref();

const confirms = async (title, note) => {
  titles.value = title;
  notes.value = note;
  const calendarApi = selectedInfos.value.view.calendar;

  calendarApi.unselect();

  if (titles.value) {
    const newEvent = {
        title: titles.value,
        start: selectedInfos.value.startStr,
        end: selectedInfos.value.endStr,
        allDay: selectedInfos.value.allDay,
        note: notes.value,
    }
    const res = await axios.post("http://localhost:3000/initialEvents", newEvent);

    const saveEvent = res.data
    calendarApi.addEvent({
        id: saveEvent.id,
        title: saveEvent.title,
        start: saveEvent.start,
        end: saveEvent.end,
        allDay: saveEvent.allDay,
        note: saveEvent.note,
    });
    await getInitialEvents();
  }
  closeModal();
};

const closeModal = () => {
    myModal.value.hide();
}

const handleSelected = (selectedInfo) => {

  myModal.value.show();
  selectedInfos.value = selectedInfo;
};

const handleEventClick = async (clickInfo) => {
  if (confirm( `Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove();
    await axios.delete(
      `http://localhost:3000/initialEvents/${clickInfo.event._def.publicId}`
    );
    await getInitialEvents();
  }
};

const getInitialEvents = async () => {
  const res = await axios.get("http://localhost:3000/initialEvents");
  initialEvents.value = res.data;
};

const calendarOption = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: "today",
    center: "prev title next",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  initialView: "dayGridMonth",
  events: initialEvents.value,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: handleSelected,
  eventClick: handleEventClick,
  eventsSet: initialEvents.value,
});

onMounted(async () => {
  myModal.value = new bootstrap.Modal(document.getElementById("exampleModal"));
  await getInitialEvents();
  calendarOption.value.events = initialEvents.value;
});
</script>

<style scoped>
::v-deep .fc-toolbar-title {
  display: inline;
}

::v-deep .fc-dayGridMonth-button {
  border-radius: 10px 0 0 10px;
}
.app-calendar {
  height: 90%;
}

::v-deep .fc .fc-button {
  background-color: #fff;
  color: #6b7a99;
}

::v-deep .fc-button {
  border-radius: 15px;
}

::v-deep .fc-prev-button {
  border-radius: 50%;
}

::v-deep .fc-next-button {
  border-radius: 50%;
}

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.calendar-container {
  display: flex;
  min-height: 90%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

.modal-body label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
}
</style>