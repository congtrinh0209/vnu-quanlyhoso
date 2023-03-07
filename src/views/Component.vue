<script setup>
  import { useCookies } from 'vue3-cookies'
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import pagination from '../views/Pagination.vue'
  const appStore = useAppStore()
  const { cookies } = useCookies()

  const validForm = ref(false)
  const rules = reactive({
    required: (value) => (!!value && !Array.isArray(value)) || (Array.isArray(value) && value.length) || "Thông tin bắt buộc"
  })
  const model1 = ref('')
  const model2 = ref('')
  const dialog = ref(false)
  const advanceSearch = ref(false)
  const dataSource = reactive([
    {name: 'Giá trị 1', value: 1},
    {name: 'Giá trị 2', value: 2},
    {name: 'Giá trị 3', value: 3}
  ])
  const headers = reactive([
    {
      sortable: false,
      title: "STT",
      align: "center",
      key: "stt"
    },
    {
      sortable: false,
      title: "Họ và tên",
      align: "left",
      key: "HoVaTen",
      class: "th-center"
    },
    {
      sortable: false,
      title: "Mã sinh viên",
      align: "left",
      key: "MaSinhVien",
      class: "th-center",
      // width: 220,
    },
    {
      sortable: false,
      title: "Email",
      align: "left",
      key: "EmailVNU",
      class: "th-center",
      // width: 120,
    },
    {
      sortable: false,
      title: "Số báo danh",
      align: "left",
      key: "SoBaoDanh",
      class: "th-center",
    },
    {
      sortable: false,
      title: "Thao tác",
      align: "center",
      key: "thaotac",
      class: "th-center",
      // width: 200,
    },
  ])
  const listStudent = reactive([
    {
        "type": "T_SinhVien",
        "PrimKey": "63fc1960b3bbb7226f56e0a1",
        "MaDinhDanh": "72627e9d-5304-4888-8121-10cdaa23e363-wzbi4snsomf5f4dl",
        "ThoiGianTao": "2023-02-27T02:45:52",
        "ThoiGianCapNhat": "2023-02-27T07:40:45",
        "TimeCreate": 1677465952701,
        "TimeUpdate": 1677483645662,
        "NguoiTaoLap": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "NguoiCapNhat": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "MaSinhVien": "2",
        "SoHoSo": "2",
        "SoBaoDanh": "2",
        "MaNhapHoc": "2",
        "HoVaTen": "Nguyễn Test",
        "NgaySinh": "1999-04-27T17:00:00",
        "GioiTinh": {
            "type": "C_GioiTinh",
            "MaMuc": "1",
            "TenMuc": "Nam"
        },
        "DanToc": {
            "type": "C_DanToc",
            "MaMuc": "",
            "TenMuc": ""
        },
        "TonGiao": {
            "type": "C_TonGiao",
            "MaMuc": "",
            "TenMuc": ""
        },
        "QuocTich": {
            "type": "C_QuocGia",
            "MaMuc": "",
            "TenMuc": ""
        },
        "GiayToTuyThan": [],
        "DiaChiThuongTru": {
            "type": "S_DiaChi",
            "SoNhaChiTiet": "",
            "TinhThanh": {
                "type": "C_TinhThanh",
                "MaMuc": "",
                "TenMuc": ""
            },
            "QuanHuyen": {
                "type": "C_QuanHuyen",
                "MaMuc": "",
                "TenMuc": ""
            },
            "PhuongXa": {
                "type": "C_PhuongXa",
                "MaMuc": "",
                "TenMuc": ""
            }
        },
        "NoiOHienTai": {
            "type": "S_DiaChi",
            "SoNhaChiTiet": "",
            "TinhThanh": {
                "type": "C_TinhThanh",
                "MaMuc": "",
                "TenMuc": ""
            },
            "QuanHuyen": {
                "type": "C_QuanHuyen",
                "MaMuc": "",
                "TenMuc": ""
            },
            "PhuongXa": {
                "type": "C_PhuongXa",
                "MaMuc": "",
                "TenMuc": ""
            }
        },
        "DanhBaLienLac": {
            "type": "S_DanhBaLienLac",
            "ThuDienTu": "",
            "SoDienThoai": "0355620860",
            "SoFax": ""
        },
        "AnhCaNhan": {
            "type": "S_TepDuLieu",
            "TenTep": "",
            "DinhDang": "",
            "KichThuoc": "",
            "DuLieu": "",
            "ChuKySo": "",
            "NgayKySo": null,
            "NgayGioTao": null,
            "NgayGioSua": null
        },
        "CoQuanDonVi": {
            "type": "T_CoQuanDonVi",
            "MaHanhChinh": "QHL",
            "TenGoi": "Khoa Luật - ĐHQG Hà Nội",
            "TenTiengAnh": "",
            "TenVietTat": ""
        },
        "TinhTrangCongTac": {
            "type": "C_TinhTrangCongTac",
            "MaMuc": null,
            "TenMuc": null
        },
        "DanhTinhDienTu": [],
        "EmailVNU": "zxt@gmail.com",
        "ChungMinhThu": "012345678",
        "MainImage": {
            "type": "T_Attachment",
            "Id": null,
            "FileName": null,
            "FileUrl": null
        },
        "MaLopKhoaHoc": null,
        "TenLopKhoaHoc": null
    }
  ])
  const itemsPerPage = ref(10)
  const loadingData = ref(false)
  const loading = ref(false)
  const page = ref(1)
  const pageCount = ref(3)
  const total = ref(10)

  const eventClick = function () {
    console.log('run callback')
  }
  const action = function () {
    loading.value = true
    setTimeout(function () {
      loading.value = false
    }, 300)
  }
  const changePage = function (page) {
    console.log('page_pagination', page.value)
  }
  const showConfirm = function () {
    appStore.SET_SHOWCONFIRM(true)
    let confirm = {
      auth: false,
      title: 'Xóa cán bộ',
      message: 'Bạn có chắc chắn muốn xóa',
      button: {
        yes: 'Có',
        no: 'Không'
      },
      callback: () => {
        console.log("Tôi đồng ý")
      }
    }
    appStore.SET_CONFIG_CONFIRM_DIALOG(confirm)
  }
  const showDialog = function () {
    dialog.value = true
  }
  onMounted(() => {
    
  })
</script>
<template>
  <v-card class="mx-auto pa-3" style="box-shadow: none !important;">
    <v-row justify="end" class="mt-0 mb-0 mx-0" style="border-bottom: 1px solid #025e29;">
      <v-col class="d-flex align-center justify-start py-0 px-0" style="color: #025E29;font-weight: 500;">
        <div class="header-content">
          DANH SÁCH CÁN BỘ
        </div>
        <div class="triangle-header"></div>
      </v-col>
      <v-spacer></v-spacer>
      
      <v-col class="d-flex align-center justify-end py-0 px-0" style="max-width: 200px;">
        <v-btn
          size="small"
          color="success"
          :prepend-icon="!advanceSearch ? 'mdi-filter-variant-plus' : 'mdi-filter-variant'"
          @click.stop="advanceSearch = !advanceSearch" class="mx-0" style="float: right"
        >
          Tìm kiếm nâng cao
        </v-btn>
      </v-col>
    </v-row>


    <v-form
      class="pa-5 px-2"
      ref="formRef"
      lazy-validation
      v-model="validForm"
    >
      <v-row>
        <v-col cols="12" sm="6">
          <div class="titleText mb-2">
            <span class="text-label">Tiêu đề </span><span class="title-required">(*)</span>
          </div>
          <v-text-field
            :rules="[rules.required]"
            v-model="model1"
            append-inner-icon="mdi-magnify"
            prepend-inner-icon="mdi-account"
            @click:append-inner="eventClick"
            @click:prepend-inner="eventClick"
            :disabled="false"
            :readonly="false"
            placeholder="Nhập giá trị ..."
            dense
            hide-details="auto"
            required
            class="input-form"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <div class="titleText mb-2">
            <span class="text-label">Tiêu đề </span><span class="title-required">(*)</span>
          </div>
          <v-textarea
            class="input-form"
            v-model="model1"
            placeholder="Nhập giá trị"
            dense
            hide-details="auto"
            clearable
            :rows="3"
            :rules="[rules.required]"
            required
          ></v-textarea>
        </v-col>

        <v-col cols="12" sm="6">
          <div class="titleText mb-2">
            <span class="text-label">Tiêu đề </span><span class="title-required">(*)</span>
          </div>
          <v-autocomplete
            class="input-form"
            hide-no-data
            v-model="model2"
            :items="dataSource"
            :multiple="true"
            item-title="name"
            item-value="value"
            dense
            hide-details="auto"
            return-object
            clearable
            required
            :rules="[rules.required]"
          >
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-form>
    <!-- button -->
    <v-row class="mx-0 my-5">
      <v-col cols="12">
          
        <v-btn size="small" icon="mdi-pencil" color="success"></v-btn>

        <span class="mx-3"></span>

        <v-tooltip location="top">
          <template v-slot:activator="{ props }">
            <v-btn icon variant="flat" size="small" v-bind="props">
              <v-icon size="22" color="success">mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Sửa</span>
        </v-tooltip>

        <v-tooltip location="top">
          <template v-slot:activator="{ props }">
            <v-btn icon variant="flat" size="small" v-bind="props">
              <v-icon size="22" color="error">mdi-close</v-icon>
            </v-btn>
          </template>
          <span>Xóa</span>
        </v-tooltip>
        
        <span class="mx-3"></span>

        <v-btn
          size="small"
          :loading="loading"
          :disabled="loading"
          color="success"
          prepend-icon="mdi-content-save"
          @click.stop="action()"
        >
          Đồng ý
        </v-btn>
        <span class="mx-3"></span>
        <v-btn
          size="small"
          :loading="loading"
          :disabled="loading"
          color="error"
          prepend-icon="mdi-close"
          @click.stop="action()"
        >
          Thoát
        </v-btn>

        <span class="mx-3"></span>

        <v-btn
          size="small"
          variant="outlined"
          color="success"
          prepend-icon="mdi-cloud-upload"
        >
          Outlined Button
        </v-btn>

        <v-btn
          class="ml-4"
          size="small"
          color="success"
          @click.stop="showConfirm()"
        >
          Show Confirm
        </v-btn>

        <v-btn
          class="ml-4"
          size="small"
          color="success"
          @click.stop="showDialog()"
        >
          Show Dialog
        </v-btn>
      </v-col>
    </v-row>
    <!-- table -->
    <v-row class="mx-0">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="listStudent"
          v-model:items-per-page="itemsPerPage"
          item-value="PrimKey"
          hide-default-footer
          class="table-base mt-2"
          no-data="Không có dữ liệu"
          :loading="loadingData"
          loading-text="Đang tải... "
        >

          <template v-slot:item="{ item, index }">
            <tr>
              <td class="align-center" width="70">{{ index + 1 }}</td>
              <td class="align-left">{{ item.columns.HoVaTen }}</td>
              <td class="align-right" width="120">{{ item.columns.MaSinhVien }}</td>
              <td width="120">{{ item.columns.EmailVNU }}</td>
              <td width="120">{{ item.columns.SoBaoDanh }}</td>
              <td class="align-center" width="150">
                <div>
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn icon variant="flat" size="small" v-bind="props" class="mr-2">
                        <v-icon size="22" color="success">mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Sửa</span>
                  </v-tooltip>

                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn icon variant="flat" size="small" v-bind="props">
                        <v-icon size="22" color="error">mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Xóa</span>
                  </v-tooltip>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
        <pagination :pageInput="page" :pageCount="pageCount" :total="total" @change-page="changePage" style="margin-bottom: 50px;"></pagination>
      </v-col>
    </v-row>
    <!-- dialog -->
    <v-dialog
      max-width="1000"
      v-model="dialog"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          color="success" class="px-3"
        >
          <v-toolbar-title>Thêm mới cán bộ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="flat" size="small" icon color="success" @click="dialog = false" >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-2 px-3">
          <!-- Content dialog -->
          <v-form
            ref="formRef"
            lazy-validation
            v-model="validForm"
          >
            <v-row>
              <v-col cols="12" sm="6">
                <div class="titleText mb-2">
                  <span class="text-label">Tiêu đề </span><span class="title-required">(*)</span>
                </div>
                <v-text-field
                  :rules="[rules.required]"
                  v-model="model1"
                  append-inner-icon="mdi-magnify"
                  prepend-inner-icon="mdi-account"
                  @click:append-inner="eventClick"
                  @click:prepend-inner="eventClick"
                  variant="solo"
                  :disabled="false"
                  :readonly="false"
                  placeholder="Nhập giá trị ..."
                  dense
                  hide-details="auto"
                  required
                  class="input-form"
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="titleText mb-2">
                  <span class="text-label">Tiêu đề </span><span class="title-required">(*)</span>
                </div>
                <v-textarea
                  class="input-form"
                  v-model="model1"
                  placeholder="Nhập giá trị"
                  variant="solo"
                  dense
                  hide-details="auto"
                  clearable
                  :rows="3"
                  :rules="[rules.required]"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end pb-3 px-3">
          <v-btn
            size="small" variant="elevated"
            :loading="loading"
            :disabled="loading"
            color="error"
            prepend-icon="mdi-close"
            @click.stop="dialog = false"
            class="mr-3"
          >
            Thoát
          </v-btn>
          <v-btn
            size="small" variant="elevated"
            :loading="loading"
            :disabled="loading"
            color="success"
            prepend-icon="mdi-content-save"
            @click.stop="dialog = false"
          >
            Thêm mới
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
  </v-card>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
