<template>
  <div class="container">
    <ejs-schedule height="600px" width="100%" ref='scheduleObj'
      :selectedDate="selectedDate"
      :eventSettings="eventSettings"
      :actionBegin="onActionBegin"
    >
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
  </div>
</template>

<script setup>
import { onMounted, provide, ref,nextTick } from "vue";
import {ScheduleComponent as EjsSchedule, ViewsDirective as EViews, ViewDirective as EView, ResourcesDirective as EResources, ResourceDirective as EResource,
  Day, Week, WorkWeek, Month, Agenda,} from "@syncfusion/ej2-vue-schedule";
import { DataManager ,WebApiAdaptor} from "@syncfusion/ej2-data";
import axios from "axios";
provide("schedule", [Day, Week, WorkWeek, Month, Agenda]);

const remoteData= new DataManager({
    url : 'http://localhost:3000/dataSource',
    adaptor : new WebApiAdaptor,
    crossDomain : true
});

const scheduleObj = ref(null)
const selectedDate = new Date();
const ownerDataSource = ref([])
const eventSettings = ref({
  dataSource: remoteData
})

const getOwnerDataSource = async() => {
  const res = await axios.get("http://localhost:3000/ownerDataSource");
  ownerDataSource.value = res.data
}

const onActionBegin = async (args) => {
  if (args.requestType === 'eventCreate') {
    try {
       await axios.post('http://localhost:3000/dataSource', args.data[0]);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  } else if (args.requestType === 'eventRemove') {
    try {
      await axios.delete(`http://localhost:3000/dataSource/${args.data[0].id}`);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  } else if (args.requestType === 'eventChange') {
    try {
      await axios.put(`http://localhost:3000/dataSource/${args.data.id}`, args.data);
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
</script>

<style scoped>

.container {
  margin-top:100px;
  margin-bottom:100px;
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
