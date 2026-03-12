<template>
  <div class="box" @click="loginHandle">{{ useLoginDataStore().token }}</div>
</template>
<script setup lang="ts">
import { api } from '@/utils/alova/api'
import { useLoginDataStore } from '@/stores/loginData'

const loginHandle = async () => {
  const res = await api({
    username: 'zizhujianzhan',
    password: 'zizhujianzhan@2025!',
  })
  useLoginDataStore().setToken(res.data)
}
</script>
<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: red;
}
.audio_mian {
  display: none;
}
</style>
