<template>
  <RouterView></RouterView>
  <RouterLink
    :to="{ name: 'insert-note' }"
    type="button"
    class="btn btn-success"
    style="margin-left: 10px"
    >新增</RouterLink
  >
  <div>
    <h1>show Note</h1>
    <div class="note" v-for="note in NoteInfo" :key="note.todoId">
      <span>{{ note.name }}</span
      >/
      <span>{{ note.title }}</span>
      <p v-if="note.isComplete !== 'Y'">未完成</p>
      <p v-if="note.isComplete === 'Y'">已完成 | {{ note.completeTime }}</p>
      <p>{{ note.todoContent }}</p>
      <button
        type="button"
        class="btn btn-success"
        @click="updateTodoStatus(note.todoId)"
        v-if="note.isComplete !== 'Y'"
      >
        完成
      </button>
      <RouterLink
        :to="{ name: 'update-note', query: { todoId: note.todoId } }"
        type="button"
        class="btn btn-success"
        style="margin-left: 10px"
        >編輯</RouterLink
      >
      <!-- <button
        type="button"
        class="btn btn-success"
        @click="deleverNote(note)"
        style="margin-left: 10px"
      >
        編輯
      </button> -->
      <button
        type="button"
        class="btn btn-success"
        @click="deleteNote(note.todoId)"
        style="margin-left: 10px"
      >
        刪除
      </button>
    </div>
  </div>
</template>

<script setup>
import axiosApi from 'axios';
import { ref, onMounted, watch, computed } from 'vue';
import InsertNote from './views/InsertNote.vue';
import { RouterLink } from 'vue-router';

const NoteInfo = ref(null);

// 取得 note 資料
const getNoteInfo = async () => {
  console.log('call getNoteInfo');
  const response = await axiosApi.get('https://192.168.233.40/todo/api/Todo/Get');

  NoteInfo.value = response.data.returnData;
  console.log(NoteInfo.value);
};

onMounted(async () => {
  await getNoteInfo();
});

//更新 note 完成狀態
const updateTodoStatus = async (todoId) => {
  console.log('call updateTodoStatus');
  let data = {
    todoId: todoId,
    isComplete: 'Y'
  };

  const response = await axiosApi.put(
    `https://192.168.233.40/todo/api/Todo/UpdateTodoStatus/${todoId}`,
    data
  );
  window.location.reload();
};

//刪除 note
const deleteNote = async (todoId) => {
  console.log('call deleteNote');
  const response = await axiosApi.delete(`https://192.168.233.40/todo/api/Todo/Delete/${todoId}`);
  window.location.reload();
};
</script>

<style scoped>
.note {
  flex: 1;
  margin-bottom: 5px;
  background-color: seashell;
  border-color: silver;
  border-style: solid;
  border-radius: 3%;
}
</style>
