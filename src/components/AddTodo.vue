<template>
    <div class="add-todo">
        <input v-model="newTodo" @keyup.enter="submitTodo" placeholder="Add a new todo"/>
        <button @click="submitTodo">Add</button>
    </div>
</template>