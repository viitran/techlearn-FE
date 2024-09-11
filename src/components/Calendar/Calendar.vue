<template>
    <ejs-schedule height="750px" width="100%" ref='scheduleObj'
      :selectedDate="selectedDate"
      :eventSettings="eventSettings"
      :actionBegin="onActionBegin"
      class="calendar"
     :editorTemplate="'editorTemplate'"
     :eventRendered="onEventRendered"
     :startHour="startHour"
     :endHour="endHour"
    >
    <template v-slot:editorTemplate>
      <table class="custom-event-editor" width="100%" cellpadding="5">
        <tbody>
              <tr>
                <td class="e-textlabel">Title</td>
                <td colspan="4">
                  <input id="Subject" class="e-field e-input" type="text" value="" name="Subject" style="width: 100%" />
                </td>
              </tr>
              <tr>
                <td class="e-textlabel">Status</td>
                <td colspan="4"><ejsDropdownlist
                  id='OwnerId'
                  name="OwnerId"
                  class="e-field"
                  placeholder= 'Choose status'
                  :dataSource='ownerDataSource'
                  :fields="dropListFields" >
                    </ejsDropdownlist>
                </td>
              </tr>
              <tr>
                <td class="e-textlabel">From</td>
                <td colspan="4"><ejsDatetimepicker id="StartTime" class="e-field" name="StartTime"></ejsDatetimepicker>
                </td>
              </tr>
              <tr>
                <td class="e-textlabel">To</td>
                <td colspan="4"><ejsDatetimepicker id="EndTime" class="e-field" name="EndTime" ></ejsDatetimepicker>
                </td>
              </tr>
              <tr>
                <td class="e-textlabel">Description</td>
                <td colspan="4">
                  <textarea id="Description" class="e-field e-input" name="Description" rows="3" cols="50"
                    style="width: 100%; height: 60px !important; resize: vertical"></textarea>
                </td>
              </tr>
            </tbody>
      </table>
    </template>
      <e-views>
        <e-view option="Day"></e-view>
        <e-view option="Week"></e-view>
        <e-view option="WorkWeek"></e-view>
        <e-view option="Month"></e-view>
        <e-view option="Agenda"></e-view>
      </e-views>
      <e-resources>
        <e-resource
          field="OwnerId"
          title="Owner"
          name="Owners"
          :dataSource="ownerDataSource"
          textField="OwnerText"
          idField="Id"
          colorField="OwnerColor"
        >
        </e-resource>
      </e-resources>
    </ejs-schedule>
</template>

<script setup>
import { onMounted, provide, ref,nextTick } from "vue";
import {ScheduleComponent as EjsSchedule, ViewsDirective as EViews, ViewDirective as EView, ResourcesDirective as EResources, ResourceDirective as EResource,
  Day, Week, WorkWeek, Month, Agenda, DragAndDrop} from "@syncfusion/ej2-vue-schedule";
import { DataManager ,WebApiAdaptor} from "@syncfusion/ej2-data";
import axios from "axios";
import { DropDownListComponent as ejsDropdownlist} from "@syncfusion/ej2-vue-dropdowns";
import { DateTimePickerComponent  as ejsDatetimepicker} from "@syncfusion/ej2-vue-calendars";
import { watch } from "vue";

const props = defineProps(['url', 'id']);

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

  dataSource: remoteData
});

const startHour = "08:00";
const endHour = "20:00";

const dropListFields= {
  text:"OwnerText",
  value:"Id"
}

const getOwnerDataSource = async () => {
  const res = await axios.get(`${props.url}/teachers/`);
  ownerDataSource.value = res.data;

}
const getEvent = async () => {
  try {
    const filtered = await axios.get(`http://localhost:8181/api/v1/teacher-calendar/find-by-id/${props.id}`);
  
    const res = await axios.get("http://localhost:8181/api/v1/teacher-calendar/?StartDate=2020-09-07T17:00:00.000Z&EndDate=2024-09-14T17:00:00.000Z");
    let allEvents = res.data;  // Tất cả sự kiện từ API
    allEvents = res.data.filter((i) =>{
        return i.Id  === filtered.data[0].Id
      })
      eventSettings.value.dataSource = allEvents;
       await nextTick();
      scheduleObj.value.refreshEvents();
  } catch (error) {
    console.error('Error fetching or filtering events:', error);
  }
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
  }

onMounted(() =>{
  getOwnerDataSource()
})

watch(() => props.id, async (newId) => {
  if (newId) {
    getEvent();
    await nextTick(() => {
    scheduleObj.value.refreshEvents();
  });
  }
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
