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
    <GitHub link="https://github.com/Chanzhaoyu/color-picker" />
  </div>
</template>

<script setup lang="ts">
import { generate, presetPalettes } from "@ant-design/colors";
import Message from "vue-m-message";
import "vue-m-message/dist/style.css";
import GitHub from "@/components/GitHub.vue";

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
