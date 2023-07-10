<template>
  <div class="p-4 min-h-screen bg-[#01031d] text-white">
    <div class="max-w-screen-xl m-auto">
      <main class="space-y-8">
        <h1 class="my-8 text-3xl font-bold text-center">Color Pick</h1>
        <div class="space-y-2">
          <h2 class="text-xl">推荐颜色</h2>
          <div class="space-x-2">
            <button
              class="w-6 h-6 rounded-full hover:scale-110 transition"
              v-for="(item, index) of defaultColors"
              :key="index"
              :style="{ backgroundColor: item }"
              @click="color = item"
            ></button>
          </div>
        </div>
        <div class="space-y-2">
          <h2 class="text-xl">自定颜色</h2>
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <input v-model="color" class="input h-10 text-slate-700 w-44" />
              <color-input position="right" v-model="color" />
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <h2 class="text-xl">色板</h2>
          <div class="space-y-4">
            <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 rounded-md overflow-hidden">
              <div
                class="cursor-pointer flex h-20 hover:scale-110 transition overflow-hidden"
                :style="{ backgroundColor: item }"
                v-for="(item, index) of colorsNormal"
                :key="index"
                @click="onCopy(item)"
              >
                <div class="m-auto" :style="{ color: index > 4 ? '#fff' : '#000' }">
                  <p>Color-{{ index + 1 }}</p>
                  <p>{{ item }}</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 rounded-md overflow-hidden">
              <div
                class="cursor-pointer flex h-20 hover:scale-110 transition overflow-hidden"
                :style="{ backgroundColor: item }"
                v-for="(item, index) of colorsDark"
                :key="index"
                @click="onCopy(item)"
              >
                <div class="m-auto" :style="{ color: index < 4 ? '#fff' : '#000' }">
                  <p>Color-{{ index + 1 }}</p>
                  <p>{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <h2 class="text-xl">推荐</h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div class="mockup-code">
                <div class="flex justify-between items-center px-6">
                  <span class="font-bold">Light</span>
                  <button class="btn btn-outline btn-info btn-xs" @click="onCopy(lightColors)">复制</button>
                </div>
                <pre><code>{{ lightColors }}</code></pre>
              </div>
            </div>
            <div>
              <div class="mockup-code">
                <div class="flex justify-between items-center px-6">
                  <span class="font-bold">Dark</span>
                  <button class="btn btn-outline btn-info btn-xs" @click="onCopy(darkColors)">复制</button>
                </div>
                <pre><code>{{ darkColors }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div class="fixed text-sm text-center right-2 bottom-2 opacity-70">
      <a class="link link-accent" href="https://github.com/Chanzhaoyu/color-picker" target="_blank">
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"
            fill="rgba(255,255,255,1)"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generate, presetPalettes } from "@ant-design/colors";
import Message from "vue-m-message";
import "vue-m-message/dist/style.css";
// @ts-ignore
import ColorInput from "vue-color-input";

const defaultColors = computed(() => {
  const colors: string[] = [];
  for (const key in presetPalettes) {
    colors.push(presetPalettes[key][5]);
  }
  return colors;
});

const color = ref<string>(presetPalettes.blue[5]);
const colorsNormal = ref<string[]>([]);
const colorsDark = ref<string[]>([]);

const lightColors = ref<string>("");
const darkColors = ref<string>("");

function generateColor(color: string) {
  try {
    const c = generate(color);
    colorsNormal.value = c;
    lightColors.value = `
      "light": {
        "primaryColor": "${color}",
        "primaryColorHover": "${c[4]}",
        "primaryColorPressed": "${c[6]}",
        "primaryColorSuppl": "${c[4]}",
        "chatBgColor": "${c[3]}"
      }
    `;
    darkColors.value = `
      "dark": {
        "primaryColor": "${c[4]}",
        "primaryColorHover": "${c[3]}",
        "primaryColorPressed": "${c[4]}",
        "primaryColorSuppl": "${c[3]}",
        "chatBgColor": "${c[2]}"
      }
    `;
  } catch (error) {
    // ignore
  }
}

function onCopy(text: string) {
  try {
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    Message.success("复制成功");
  } catch (error) {
    Message.error("复制失败");
  }
}

watch(
  () => color.value,
  (val) => {
    generateColor(val);
  },
  { immediate: true }
);
</script>
