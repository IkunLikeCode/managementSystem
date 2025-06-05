<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { getProjectList } from "@/api/project";
import { BaseResponse } from "@/utils/types";
interface Project {
  userId: number;
  id: number;
  title: string;
  introduce: string;
}
const projectList = ref<Project[]>([]);
const seachAndFilter = ref({
  title: "",
  introduce: "",
  current: 1,
  pageSize: 5,
  total: 0,
});
// 获取项目列表
async function fetchProjectList() {
  try {
    const response = await getProjectList<BaseResponse<Project>>();
    projectList.value = Array.isArray(response.data)
      ? response.data
      : [response.data];
    seachAndFilter.value.total = projectList.value.length;
  } catch (error) {
    console.error("Error fetching project list:", error);
  }
}
// 搜索标题或介绍
function searchTitleOrIntroduce() {
  const { title } = seachAndFilter.value;
  const newData = projectList.value.filter((item) => {
    return item.title.indexOf(title) > -1;
  });
  console.log(newData);
  projectList.value = newData;
  seachAndFilter.value.current = 1;
  seachAndFilter.value.total = newData.length;
}

// 进行分页
const newProject = computed(() => {
  return projectList.value.slice(
    (seachAndFilter.value.current - 1) * seachAndFilter.value.pageSize,
    seachAndFilter.value.current * seachAndFilter.value.pageSize
  );
});
// 处理分页变化
function changePage(page: number) {
  seachAndFilter.value.current = page;
}

watch(
  [() => seachAndFilter.value.title, () => seachAndFilter.value.introduce],
  // 获取新值和老值
  ([newTitle, newIntroduce]) => {
    if (newTitle || newIntroduce) {
    } else {
      fetchProjectList();
    }
  }
);

onMounted(() => {
  fetchProjectList();
});
</script>
<template>
  <div class="home">
    <ElCard class="margin_b_10">
      <ElForm class="flex_c">
        <ElFormItem>
          <ElInput
            v-model="seachAndFilter.title"
            placeholder="输入标题"></ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElButton
            type="primary"
            style="margin-left: 10px"
            @click="searchTitleOrIntroduce"
            :disabled="!seachAndFilter.title && !seachAndFilter.introduce"
            >查询</ElButton
          >
        </ElFormItem>
      </ElForm>
    </ElCard>
    <ElCard>
      <ElTable class="table" :data="newProject">
        <ElTableColumn
          prop="id"
          width="120"
          label="编号"
          align="center"></ElTableColumn>
        <ElTableColumn
          width="120"
          prop="title"
          label="标题"
          align="center"></ElTableColumn>
        <ElTableColumn
          prop="introduce"
          label="介绍"
          align="center"></ElTableColumn>
      </ElTable>
      <el-pagination
        v-model:current-page="seachAndFilter.current"
        v-model:page-size="seachAndFilter.pageSize"
        :page-sizes="[5, 10, 20]"
        @change="changePage"
        background
        style="margin-top: 10px"
        :total="seachAndFilter.total"
        layout="prev, pager, next,total, sizes" />
    </ElCard>
  </div>
</template>

<style lang="less" scoped>
.table {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
