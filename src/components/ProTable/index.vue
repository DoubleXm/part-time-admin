<template>
  <div class="pro-table">
    <slot name="header"></slot>
    <div class="table-main">
      <el-table
        size="mini"
        v-loading="loading"
        ref="tableRef"
        :data="tableData.tableData"
        :row-key="_setRowKey"
        :stripe="tableData.stripe"
        :border="tableData.border"
        :fit="tableData.fit"
        :show-header="tableData.showHeader"
        :highlight-current-row="tableData.highlightCurrentRow"
        :show-summary="tableData.showSummary"
        :sum-text="tableData.sumText"
        :row-class-name="'row-class-' + tableData.className"
        :cell-class-name="'cell-class-' + tableData.className"
        :header-row-class-name="'header-row-' + tableData.className"
        :header-cell-class-name="'header-cell-' + tableData.className"
        @cell-dblclick="_cellDBClick"
        @selection-change="selectionChange"
        @sort-change="sortChange"
        style="width: 100%; heihgt: 500px;"
        height="calc(100vh - 52px - 60px - 20px - 47px)"
        :lazy="tableData.lazy"
        :load="treeLoad"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <template slot="empty">
          <div class="pro-table-empty">
            <img src="../../assets/images/noData.png" alt="no-data" />
            <p>暂无数据</p>
          </div>
        </template>
        <!-- 展开行，index， 多选 -->
        <template v-if="tableData.type === 'index'">
          <el-table-column
            :type="tableData.type"
            label="序号"
            align="center"
          ></el-table-column>
        </template>
        <template v-if="tableData.type === 'selection'">
          <el-table-column
            :type="tableData.type"
            align="center"
          ></el-table-column>
        </template>
        <template v-if="tableData.type === 'expand'">
          <el-table-column :type="tableData.type" align="center">
            <template v-slot="{ row }">
              <slot name="expand" :row="row"></slot>
            </template>
          </el-table-column>
        </template>
        <!-- 常规列和插槽相关 -->
        <template v-for="column in tableData.columns">
          <el-table-column
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :min-width="column.minWidth"
            :fixed="column.fixed"
            :align="column.align || 'center'"
            :header-align="column.headerAlign || 'center'"
            show-overflow-tooltip
            resizable
            :sortable="column.sort"
            :formatter="column.formatter"
            :label-class-name="'label-class-' + column.prop"
            :class-name="'column-class-' + column.prop"
          >
            <template v-if="column.slot" v-slot="{ row }">
              <slot :name="column.slot" :row="row"></slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="table-footer" v-if="tableData.page">
      <Pagination
        @size-change="sizeChange"
        @page-change="pageChange"
        :page-info="pagination"
        :loading="loading"
      ></Pagination>
    </div>
  </div>
</template>

<script>
//   columns: [
//     {
//       label: '日期',
//       prop: 'date',
//       width: '',
//       minWidth: '',
//       fixed: '',
//       align: 'center',
//       headerAlign: 'center',
//       sort: 'custom',
//       // formatter: () => {}
//     },
//     {
//       label: '姓名',
//       slot: 'name',
//       width: '',
//       minWidth: '',
//       fixed: '',
//       align: 'center',
//       headerAlign: 'center'
//     },
//     {
//       label: '地址',
//       prop: 'address',
//       width: '',
//       minWidth: '',
//       fixed: '',
//       align: 'center',
//       headerAlign: 'center'
//     },
//     {
//       label: '数量',
//       prop: 'number',
//       width: '',
//       minWidth: '',
//       fixed: '',
//       align: 'center',
//       headerAlign: 'center'
//     }
//   ],
// }
import { Message } from "element-ui";
import { cloneDeep } from "lodash";
import Pagination from "./Pagination";

export default {
  name: "ProTable",
  components: {
    Pagination
  },
  props: {
    sourceData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tableData: {
        className: "default-name", // row, cell headerRow headerCell 的 className
        showSummary: false, // 是否在表尾部显示合计的行
        type: "", // index selection expand
        sumText: "合计", // 合计行的默认文本 默认 Sum
        stripe: true, // 是否显示斑马条纹
        border: true, // 是否显示纵向边框
        fit: true, // 是否自动撑开列的宽度,
        showHeader: true, // 是否显示表头
        highlightCurrentRow: true, // 是否高亮当前行
        columns: [],
        tableData: [],
        page: false, // 是否开启分页
        lazy: false // 是否开启树形菜单懒加载
      },
      total: 0, // 总数
      loading: false
    };
  },
  computed: {
    pagination() {
      return {
        pageSize: this.tableData.pageSize,
        total: this.total
      };
    }
  },
  watch: {
    sourceData: {
      handler(data) {
        // 合并表格数据
        this.tableData = cloneDeep(data);
      },
      deep: true
    }
  },
  methods: {
    _setRowKey(row) {
      // 如果有 id 就返回 id 没有就选择第一个key 返回
      return row.id ? row.id : Object.keys(row).map(item => row[item])[0];
    },
    // 双击单元格
    _cellDBClick(row, column) {
      this.$copyText(row[column.property]).then(
        () => {
          Message.success("复制成功");
        },
        e => {
          console.error(`copy failed !!! ${e}`);
        }
      );
    },
    setLoading(loading) {
      this.loading = loading;
    },
    // 当选择项发生变化时会触发该事件
    selectionChange(selection) {
      this.$emit("selection-change", selection);
    },
    // 排序, sort 为 true 时不需要指定这个方法
    sortChange({ order, prop }) {
      let sortInfo = { order, prop };
      switch (order) {
        case "descending":
          sortInfo.order = "DESC";
          break;
        case "ascending":
          sortInfo.order = "ASC";
          break;
        default:
          sortInfo.order = "";
      }
      this.$emit("sort-change", sortInfo);
    },
    // 更新总数
    updateTotal(total) {
      this.total = total;
    },
    // 切换每页展示条数
    sizeChange(page) {
      this.$emit("size-change", page);
    },
    // 切换页码
    pageChange(page) {
      this.$emit("page-change", page);
    },
    // https://element.eleme.cn/#/zh-CN/component/table 参考
    treeLoad(tree, treeNode, resolve) {
      this.$emit("tree-load", tree, treeNode, resolve);
    }
  }
};
</script>

<style lang="scss" scoped>
.pro-table {
  height: calc(100% - 60px -10px);
  .table-main {
    height: 100%;
    // 去除表头右侧空白
    // /deep/.el-table th.gutter {
    //   display: table-cell !important;
    // }
    // 表格边框线层级过高
    /deep/.el-table--border::after {
      z-index: 0;
    }
    // table 空样式
    /deep/.el-table__empty-text {
      display: flex;
      justify-content: center;
      .pro-table-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 10px 0;
        img {
          width: 86px;
        }
        p {
          margin: 0;
          margin-top: 6px;
          margin-left: 4px;
          line-height: 24px;
        }
      }
    }
    /deep/tr[class^="header-row-"] {
      th {
        background: #fafafa;
      }
    }
  }
  .table-footer {
    overflow: hidden;
    margin-top: 20px;
    /deep/.el-pagination {
      float: right;
      padding-right: 0;
      .btn-next {
        margin-right: 0;
      }
    }
  }
  // 滚动条的宽度
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px; // 横向滚动条
    height: 6px; // 纵向滚动条 必写
  }
  // 滚动条的滑块
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
  }
}
</style>
