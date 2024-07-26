<template>
  <h1 style="margin-top: 20px">請填寫代辦事項456666</h1>
  <div class="s1">
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">姓名</span>
      <input
        v-model="NoteInfo.name"
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">代辦標題</span>
      <input
        v-model="NoteInfo.title"
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
    <div class="input-group mb-3" style="height: 300px">
      <span class="input-group-text" id="inputGroup-sizing-default">代辦內容</span>
      <textarea
        v-model="NoteInfo.todoContent"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      ></textarea>
    </div>
    <button type="button" class="btn btn-success" @click="updateNote(todoId)">儲存</button>
  </div>
</template>
<script setup>
import axiosApi from 'axios';
import { RouterView, useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const route = useRoute();
const todoId = ref(route.query.todoId);

const NoteInfo = ref(null);

// 取得 note 資料
const getNoteInfo = async (todoId) => {
  console.log('call getNoteInfo');
  const response = await axiosApi.get('https://192.168.233.40/todo/api/Todo/Get');

  for (let i = 0; i < response.data.returnData.length; i++) {
    if (response.data.returnData[i].todoId === todoId.value) {
      NoteInfo.value = response.data.returnData[i];
      console.log(NoteInfo.value);
    }
  }
};

onMounted(async () => {
  await getNoteInfo(todoId);
});

//修改 note
const updateNote = async (todoId) => {
  console.log('call updateNote');

  const response = await axiosApi.put(
    `https://192.168.233.40/todo/api/Todo/UpdateTodoContent/${todoId}`
  );
  window.location.reload();
};
</script>
<style scoped>
.s1 {
  width: 400px;
  margin: 10px 10px 10px 10px;
  padding: 10px 10px 10px 10px;
  border-color: seagreen;
  border-style: solid;
  border-radius: 3%;
}

.input-group {
}
</style>
