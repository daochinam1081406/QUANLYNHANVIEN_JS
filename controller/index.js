var api = new CallApi();

function getEle(id) {
  return document.getElementById(id);
}

function getListNhanVien() {
  var promise = api.fectchData();

  promise
    .then(function (result) {
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListNhanVien();
function renderUI(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var nhanvien = data[i];
    content += `
          <tr>
              <td>${nhanvien.taiKhoan}</td>
              <td>${nhanvien.hoTen}</td>
              <td>${nhanvien.email}</td>
              <td>${nhanvien.ngayLam}
              </td>
              <td>${nhanvien.chucVu}</td>
              <td>${nhanvien.tongLuong}</td>
              <td>${nhanvien.loaiNhanVien}</td>
              <td>
                  <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editNhanVien(${nhanvien.id})">Sửa</button>
                  <button class="btn btn-danger" onclick="deleteNhanVien(${nhanvien.id})">Xoá</button>
              </td>
          </tr>
      `;
  }

  getEle("tableDanhSach").innerHTML = content;
}
getEle("btnThem").onclick = function () {
  //sửa lại tiêu đề cho modal
  getEle("header-title").innerHTML = "Thêm nhân viên mới";

  //tạo nút "Add" => gắn vào footer của modal
  var btnAdd = `<button class="btn btn-success" onclick="addNhanVien()" >Thêm</button><button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal"> Đóng </button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
};

function addNhanVien() {
  // lấy thông tin từ user nhập liệu

  var taiKhoan = getEle("tknv").value;
  var hoTen = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCoBan = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;
  var tongLuong = 0;
  var loaiNhanVien = "";
  //   var tongLuong =  getEle("").value;
  //   var loaiNhanVien =  getEle("").value;
  //tạo đối tượng nhanvien từ lớp đối tượng nhanvien
  var nhanvien = new Nhanvien(
    "",
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    tongLuong,
    loaiNhanVien,
    gioLam
  );

  var promise = api.addNhanvienApi(nhanvien);

  promise
    .then(function (result) {
      alert(`thêm mới thành công ${result.data.hoTen}`);
      //close modal
      getEle("btnDong").click();
      getListNhanVien();
    })
    .catch(function (err) {
      console.log(err);
    });
}
function deleteNhanVien(id) {
  var promise = api.deleteNhanVienById(id);

  promise
    .then(function (result) {
      alert(`Đã xoá nhân viên ${result.data.hoTen}`);
      //close modal
      getEle("btnDong").click();
      getListNhanVien();
    })
    .catch(function (error) {
      console.log(error);
    });
}
function editNhanVien(id) {
  //sửa lại tiêu đề cho modal
  getEle("header-title").innerHTML = "Cập nhật nhân viên ";

  //tạo nút "sua " => gắn vào footer của modal
  var btnUpdate = `<button class="btn btn-success" onclick="updateNhanVien(${id})" >Cập nhật</button><button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal"> Đóng </button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  var promise = api.getNhanVienById(id);

  promise
    .then(function (result) {
      var nhanvien = result.data;
      //show data ra ngoài các thẻ input

      getEle("tknv").value = nhanvien.taiKhoan;
      getEle("name").value = nhanvien.hoTen;
      getEle("email").value = nhanvien.email;
      getEle("password").value = nhanvien.matKhau;
      getEle("datepicker").value = nhanvien.ngayLam;
      getEle("luongCB").value = nhanvien.luongCoBan;
      getEle("chucvu").value = nhanvien.chucVu;
      getEle("gioLam").value = nhanvien.gioLam;
    })
    .catch(function (error) {
      console.log(error);
    });
}
function updateNhanVien(id) {
  // lấy thông tin từ user nhập liệu
  var taiKhoan = getEle("tknv").value;
  var hoTen = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCoBan = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;
  var tongLuong = 0;
  var loaiNhanVien = "";
  //   var tongLuong =  getEle("").value;
  //   var loaiNhanVien =  getEle("").value;
  //tạo đối tượng nhanvien từ lớp đối tượng nhanvien
  var nhanvien = new Nhanvien(
    id,
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    tongLuong,
    loaiNhanVien,
    gioLam
  );

  var promise = api.updateNhanVienApi(nhanvien);

  promise
    .then(function (result) {
      alert(`Cập nhật thành công ${result.data.hoTen}`);
      //close modal
      getEle("btnDong").click();
      getListNhanVien();
    })
    .catch(function (err) {
      console.log(err);
    });
}
