<template>
  <ejs-schedule height="750px" width="100%" ref='scheduleObj' :selectedDate="selectedDate" :eventSettings="eventSettings" :actionBegin="onActionBegin"
    :eventTemplate="eventTemplate" :eventRendered="onEventRendered" startHour="08:00" endHour="22:00" class="calendar">
    <e-views>
      <e-view option="Day"></e-view>
      <e-view option="Week"></e-view>
      <e-view option="WorkWeek"></e-view>
      <e-view option="Month"></e-view>
      <e-view option="Agenda"></e-view>
    </e-views>
    <e-resources>
      <e-resource field="OwnerId" title="Owner" name="Owners" :dataSource="ownerDataSource" textField="OwnerText" idField="Id"
        colorField="OwnerColor">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
import { onMounted, provide, ref, nextTick } from "vue";
import {
  ScheduleComponent as EjsSchedule, ViewsDirective as EViews, ViewDirective as EView, ResourcesDirective as EResources, ResourceDirective as EResource,
  Day, Week, WorkWeek, Month, Agenda, DragAndDrop
} from "@syncfusion/ej2-vue-schedule";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import axios from "axios";

const props = defineProps(['url']);

provide("schedule", [Day, Week, WorkWeek, Month, Agenda, DragAndDrop]);

const remoteData = new DataManager({
  // url: 'http://localhost:3000/dataSource',
  url: `${props.url}/teacher-calendar`,
  adaptor: new WebApiAdaptor,
  crossDomain: true
});

const scheduleObj = ref(null);
const selectedDate = new Date();
const ownerDataSource = ref([]);
const eventSettings = ref({
  dataSource: remoteData,
});

const getOwnerDataSource = async () => {
  const res = await axios.get(`${props.url}/teachers/`);
  ownerDataSource.value = res.data;
};

const onEventRendered = (args) => {
  const ownerIds = args.data.OwnerIds || [];
  const avatarsHtml = ownerIds.map(ownerId => {
    const owner = ownerDataSource.value.find(owner => owner.Id === ownerId);
    return owner ? `<div class="mx-1"><img width="30" src="${owner.avatar}" class="owner-avatar rounded-circle img-fluid border border-white" /></div>` : '';
  }).join('');

  const isSingleAvatar = ownerIds.length === 1;
  args.element.innerHTML = !isSingleAvatar
    ? `<div class="d-flex justify-content-center mt-1">${avatarsHtml}</div><div class="d-flex justify-content-center">${args.data.Subject}</div>`
    : `<div class="d-flex align-items-center mt-1">${avatarsHtml}<div class="">${args.data.Subject}</div></div>`;
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  // Chuyển đổi sang múi giờ Asia/Bangkok
  date.setHours(date.getHours() + 7);
  // Format date to 'yyyy-MM-ddTHH:mm:ss'
  return date.toISOString().slice(0, 19);
};

const onActionBegin = async (args) => {
  if (args.requestType === 'eventCreate') {
    try {
      const eventData = args.data[0];

      const formattedEventData = {
        ...eventData,
        StartTime: formatDate(eventData.StartTime),
        EndTime: formatDate(eventData.EndTime),
      };

      console.log(formattedEventData);

      await axios.post(`${props.url}/teacher-calendar`, formattedEventData);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  } else if (args.requestType === 'eventRemove') {
    try {
      await axios.delete(`${props.url}/teacher-calendar/${args.data[0].Id}`);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  } else if (args.requestType === 'eventChange') {
    try {

      const formattedEventData = {
        ...args.data,
        StartTime: formatDate(args.data.StartTime),
        EndTime: formatDate(args.data.EndTime),
      };

      console.log(formattedEventData);

      await axios.put(`${props.url}/teacher-calendar/${formattedEventData.Id}`, formattedEventData);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  }
  await nextTick(() => {
    scheduleObj.value.refreshEvents();
  });
};

onMounted(() => {
  getOwnerDataSource();
});
</script>

<style scoped>
.calendar {
  margin-top: 60px;
}

@import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
</style>
