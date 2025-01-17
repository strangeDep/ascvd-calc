<script setup>
import { Hospital } from 'lucide-vue-next'

const props = defineProps({
  formData: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      phone: {
        prefix: '',
        middle: '',
        last: ''
      },
      age: '',
      gender: '',
      diabetes: '',
      smoking: '',
      totalCholesterol: '',
      hdlCholesterol: '',
      systolicBP: '',
      hypertensionTreatment: '',
      additionalComments: ''
    })
  }
})

const formatDate = () => {
  const today = new Date()
  return today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const translateAnswers = (id, value) => {
  const answers = {
    gender: { M: '남성', F: '여성' },
    diabetes: { Y: '예', N: '아니요' },
    smoking: { Y: '예', N: '아니요' },
    hypertensionTreatment: { Y: '예', N: '아니요' }
  }
  return answers[id]?.[value] || value
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8 flex justify-center items-start">
    <!-- A4 크기 컨테이너 -->
    <div class="bg-white w-[210mm] min-h-[297mm] shadow-lg mx-auto">
      <div class="p-[20mm]">
        <!-- 헤더 섹션 -->
        <div class="border-b pb-6">
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
            ASCVD Risk Calculator 검사 결과지
          </p>
        </div>

        <div class="space-y-6 mt-6">
          <!-- 기본 정보 섹션 -->
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <p class="text-sm text-gray-600">문서번호: ASCVD-{{ formatDate().replace(/[^0-9]/g, '') }}</p>
              <p class="text-sm text-gray-600">검사일: {{ formatDate() }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4">
              <p class="text-sm text-gray-600">
                성명: <span class="font-medium text-gray-900">{{ formData.name }}</span>
              </p>
              <p class="text-sm text-gray-600">
                연락처: <span class="font-medium text-gray-900">
                  {{ `${formData.phone.prefix}-${formData.phone.middle}-${formData.phone.last}` }}
                </span>
              </p>
            </div>
          </div>

          <!-- 검사 결과 섹션 -->
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 class="text-lg font-bold text-gray-900 mb-4">검사 항목 및 결과</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <p class="text-sm text-gray-600">
                  연령: <span class="font-medium text-gray-900">{{ formData.age }} 세</span>
                </p>
                <p class="text-sm text-gray-600">
                  성별: <span class="font-medium text-gray-900">{{ translateAnswers('gender', formData.gender) }}</span>
                </p>
                <p class="text-sm text-gray-600">
                  당뇨병: <span class="font-medium text-gray-900">{{ translateAnswers('diabetes', formData.diabetes) }}</span>
                </p>
                <p class="text-sm text-gray-600">
                  흡연: <span class="font-medium text-gray-900">{{ translateAnswers('smoking', formData.smoking) }}</span>
                </p>
              </div>
              <div class="space-y-2">
                <p class="text-sm text-gray-600">
                  총 콜레스테롤: <span class="font-medium text-gray-900">{{ formData.totalCholesterol }} mg/dl</span>
                </p>
                <p class="text-sm text-gray-600">
                  HDL 콜레스테롤: <span class="font-medium text-gray-900">{{ formData.hdlCholesterol }} mg/dl</span>
                </p>
                <p class="text-sm text-gray-600">
                  수축기 혈압: <span class="font-medium text-gray-900">{{ formData.systolicBP }} mm Hg</span>
                </p>
                <p class="text-sm text-gray-600">
                  고혈압 치료: <span class="font-medium text-gray-900">
                    {{ translateAnswers('hypertensionTreatment', formData.hypertensionTreatment) }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <!-- ASCVD 위험도 결과 -->
          <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 class="text-lg font-bold text-gray-900 mb-4">ASCVD 위험도 평가</h3>
            <div class="space-y-4">
              <p class="text-sm text-gray-700">
                10년 내 ASCVD 발생 위험도: <span class="font-bold text-yellow-600">계산된 위험도%</span>
              </p>
              <div class="p-4 bg-white rounded border border-yellow-100">
                <p class="text-sm text-gray-600">
                  ※ 참고사항: ASCVD 위험도는 미국심장학회(AHA)와 미국심장협회(ACC)에서 제시한
                  계산법을 기반으로 산출되었습니다.
                </p>
              </div>
            </div>
          </div>

          <!-- 추가 의견 -->
          <div v-if="formData.additionalComments" class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 class="text-lg font-bold text-gray-900 mb-4">추가 의견</h3>
            <p class="text-sm text-gray-600">{{ formData.additionalComments }}</p>
          </div>

          <!-- 담당의 서명 -->
          <div class="flex justify-end mt-12">
            <div class="text-right">
              <p class="text-sm text-gray-600">담당의</p>
              <p class="text-lg font-bold text-gray-900">이 성 민</p>
              <p class="text-xs text-gray-500">서울안녕내과의원 원장</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>