<script setup lang="ts">
import ToDoFilters from '@/components/ToDoFilters.vue'
import ToDoSearch from '@/components/ToDoSearch.vue'
import ToDoForm from '@/components/ToDoForm.vue'
import ToDoTaskList from '@/components/ToDoTaskList.vue'

const suffix = import.meta.env.PUBLIC_SUFFIX
</script>

<template>
  <div class="container">
    <header>
      <h1>ToDo App {{ suffix }}</h1>
    </header>
    <ToDoForm />
    <ToDoSearch />
    <ToDoFilters />
    <ToDoTaskList />
  </div>
</template>
