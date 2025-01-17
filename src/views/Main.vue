<script setup>
import { ref } from 'vue'
import { Hospital } from 'lucide-vue-next'
import router from "../router/index.js";

const phonePrefix = ['010', '011', '016', '017', '018', '019']

const questions = [
  {
    id: 'age',
    title: '나이',
    description: '이 계산기는 40~75세의 개인에게만 적용됩니다.',
    type: 'input',
    placeholder: '표준: 20-79',
    unit: '연령'
  },
  {
    id: 'diabetes',
    title: '당뇨병',
    type: 'button',
    subType: 'yesNo',
    options: [
      { label: '예', value: true },
      { label: '아니요', value: false },
    ]
  },
  {
    id: 'gender',
    title: '성별',
    type: 'button',
    subType: 'gender',
    options: [
      { label: '남성', value: true },
      { label: '여성', value: false },
    ]
  },
  {
    id: 'smoking',
    title: '흡연자',
    type: 'button',
    subType: 'yesNo',
    options: [
      { label: '예', value: true },
      { label: '아니요', value: false },
    ]
  },
  {
    id: 'totalCholesterol',
    title: '총 콜레스테롤',
    type: 'input',
    placeholder: '표준: 150-200',
    unit: 'mg/dl'
  },
  {
    id: 'hdlCholesterol',
    title: 'HDL 콜레스테롤',
    type: 'input',
    placeholder: '표준: 60-155',
    unit: 'mg/dl'
  },
  {
    id: 'systolicBP',
    title: '수축기 혈압',
    type: 'input',
    placeholder: '표준: 100-120',
    unit: 'mm Hg'
  },
  {
    id: 'hypertensionTreatment',
    title: '고혈압 치료',
    type: 'button',
    subType: 'yesNo',
    options: [
      { label: '예', value: true },
      { label: '아니요', value: false },
    ]
  }
]

const formData = ref({
  name: '',
  phone: {
    prefix: '010',
    middle: '',
    last: ''
  },
  age: '',
  diabetes: '',
  gender: '',
  smoking: '',
  totalCholesterol: '',
  hdlCholesterol: '',
  systolicBP: '',
  hypertensionTreatment: '',
  additionalComments: ''
})

const handleAnswerSelect = (id, type, value) => {
  if (type === 'yesNo') {
    formData.value[id] = value ? 'Y' : 'N'
  } else if (type === 'gender') {
    formData.value[id] = value ? 'M' : 'F'
  } else {
    formData.value[id] = value
  }
}

const handleSubmit = () => {
  router.push({
    name: 'report',
    params: {
      formData: formData.value
    }
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8 flex justify-center items-start">
    <div class="bg-white w-[210mm] min-h-[297mm] shadow-lg mx-auto">
      <div class="p-[20mm]">
        <!-- 헤더 섹션 -->
        <div class="border-b p-6">
          <div class="flex items-center justify-center gap-3">
            <Hospital class="h-8 w-8 text-yellow-500" />
            <div class="flex flex-col items-center">
              <h1 class="text-2xl font-bold text-gray-900">
                서울<span class="text-yellow-500">안녕내과</span>의원
              </h1>
              <p class="text-xs text-gray-700">
                SEOUL HI INTERNAL MEDICINE
              </p>
            </div>
          </div>
          <p class="text-center text-gray-600 mt-2 font-bold">
            ASCVD (Atherosclerotic Cardiovascular Disease) 2013 Risk Calculator from AHA/ACC
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6 mt-6">
          <!-- 기본 정보 섹션 -->
          <div class="bg-white border border-gray-200 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">환자 정보</h3>
            <div class="space-y-4">
              <!-- 이름 -->
              <div class="flex items-center">
                <label class="block text-sm font-medium text-gray-700 w-24">성명</label>
                <input
                    type="text"
                    v-model="formData.name"
                    class="flex-1 rounded-md custom-input"

                />
              </div>

              <!-- 전화번호 -->
              <div class="flex items-center">
                <label class="block text-sm font-medium text-gray-700 w-24">연락처</label>
                <div class="flex gap-2 items-center">
                  <select
                      v-model="formData.phone.prefix"
                      class="w-24 rounded-md custom-input"
                  >
                    <option
                        v-for="prefix in phonePrefix"
                        :key="prefix"
                        :value="prefix"
                    >
                      {{ prefix }}
                    </option>
                  </select>
                  <span class="text-gray-500">-</span>
                  <input
                      type="text"
                      v-model="formData.phone.middle"
                      maxlength="4"
                      class="w-20 rounded-md custom-input"

                  />
                  <span class="text-gray-500">-</span>
                  <input
                      type="text"
                      v-model="formData.phone.last"
                      maxlength="4"
                      class="w-20 rounded-md custom-input"

                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 설문 항목 섹션 -->
          <div class="space-y-3">
            <div
                v-for="question in questions"
                :key="question.id"
                class="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg"
            >
              <div class="w-1/2">
                <p class="text-left text-gray-800 font-bold">{{ question.title }}</p>
                <p v-if="question.description" class="text-left text-sm text-gray-600">
                  {{ question.description }}
                </p>
              </div>

              <div class="w-1/2 flex justify-end gap-2">
                <!-- Input type questions -->
                <template v-if="question.type === 'input'">
                  <div class="flex items-center w-full max-w-[300px]">
                    <input
                        type="text"
                        v-model="formData[question.id]"
                        class="flex-1 rounded-l-md custom-input"
                        :placeholder="question.placeholder"
                    />
                    <span class="px-4 py-2 bg-yellow-500 text-black rounded-r-md min-w-[80px] text-center">
                      {{ question.unit }}
                    </span>
                  </div>
                </template>

                <!-- Yes/No or Button type questions -->
                <template v-if="question.type === 'button'">
                  <div class="flex gap-2 w-full max-w-[300px]">
                    <button
                        v-for="option in question.options"
                        :key="option.label"
                        type="button"
                        @click="handleAnswerSelect(question.id, question.subType, option.value)"
                        class="flex-1 px-4 py-2 rounded-md transition-colors"
                        :class="[
                          formData[question.id] === (option.value ? (question.subType === 'gender' ? 'M' : 'Y') : (question.subType === 'gender' ? 'F' : 'N'))
                            ? 'bg-yellow-500 text-black'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        ]"
                    >
                      {{ option.label }}
                    </button>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- 추가 의견 섹션 -->
          <div class="bg-white border border-gray-200 p-6 rounded-lg">
            <label class="block text-sm font-medium text-gray-700 mb-2">추가 의견</label>
            <textarea
                v-model="formData.additionalComments"
                rows="4"
                class="w-full rounded-md custom-input"
                placeholder="추가 의견이 있으시다면 자유롭게 작성해주세요."
            />
          </div>

          <!-- 제출 버튼 -->
          <div class="flex justify-center pt-4">
            <button
                type="submit"
                class="px-6 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors"
            >
              설문 제출하기
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>