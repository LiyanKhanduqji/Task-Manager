<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
</script>

<script setup></script>
<template>
  <div class="flex items-center p-[40px] bg-white rounded-2xl margin-auto translate-y-12 shadow-lg">
    <div class="w-[50%]">
      <img src="../assets/images/vecteezy_happy-men-working-at-office_.jpg" alt="" />
    </div>
    <div class="py-[90px] flex flex-col items-center">
      <h1 class="text-[35px] font-bold text-darkBlue capitalize">
        create your <span class="relative font-bold">to do</span> list for free
      </h1>
      <p class="w-[520px] p-[30px] text-lightTextColor">
        Organize your tasks, set priorities, and stay on top of your day effortlessly. Whether it's
        work, personal projects, or anything in between, let our intuitive platform help you
        streamline your tasks and focus on what matters most. Let's make every day a productive one!
      </p>
      <div class="flex gap-[30px]">
        <router-link to="/login">
          <ButtonComponent label="Login" />
        </router-link>
        <router-link to="/signup">
          <ButtonComponent
            label="Signup"
            class="text-white font-bold bg-blueBackground py-[10px] px-[20px] rounded w-[90px]"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
span::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: #8d0801;
  width: 100%;
  height: 3px;
}
</style>
