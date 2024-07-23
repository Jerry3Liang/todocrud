<template>
  <h1 style="margin-top: 20px">請填寫代辦事項</h1>
  <div class="s1">
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">姓名</span>
      <input
        v-model="name"
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">代辦標題</span>
      <input
        v-model="title"
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
    <div class="input-group mb-3" style="height: 300px">
      <span class="input-group-text" id="inputGroup-sizing-default">代辦內容</span>
      <textarea
        v-model="todoContent"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      ></textarea>
    </div>
    <button type="button" class="btn btn-success" @click="insertNoteInfo()">儲存</button>
  </div>
  <RouterView></RouterView>
</template>

<script setup>
import axiosApi from 'axios';
import { RouterView, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();

// 填寫代辦事項
const name = ref('');
const title = ref('');
const todoContent = ref('');

const insertNoteInfo = async () => {
  console.log('call insertNoteInfo');
  let data = {
    name: name.value,
    title: title.value,
    todoContent: todoContent.value
  };
  const response = await axiosApi.post('https://192.168.233.40/todo/api/Todo/InsertTodo', data);

  router.push({ name: 'data-app' });
  name.value = '';
  title.value = '';
  todoContent.value = '';
  console.log(response.data);
};

// onMounted(async () => {});
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
