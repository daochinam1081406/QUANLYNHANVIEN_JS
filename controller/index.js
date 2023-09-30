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
    var nhanvienT = new Nhanvien(
      nhanvien.id,
      nhanvien.taiKhoan,
      nhanvien.hoTen,
      nhanvien.email,
      nhanvien.matKhau,
      nhanvien.ngayLam,
      nhanvien.luongCoBan,
      nhanvien.chucVu,
      nhanvien.tongLuong,
      nhanvien.loaiNhanVien,
      nhanvien.gioLam
    );
    nhanvienT.tinhTongLuong();
    nhanvienT.xepLoai();
    content += `
          <tr>
              <td>${nhanvien.taiKhoan}</td>
              <td>${nhanvien.hoTen}</td>
              <td>${nhanvien.email}</td>
              <td>${nhanvien.ngayLam}
              </td>
              <td>${nhanvien.chucVu}</td>
              <td>${nhanvienT.tongLuong}</td>
              <td>${nhanvienT.loaiNhanVien}</td>
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
  getEle("tknv").value = "";
  getEle("name").value = "";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("datepicker").value = null;
  getEle("luongCB").value = "";
  getEle("chucvu").value = "Chọn chức vụ";
  getEle("gioLam").value = "";

  getEle("tbTKNV").innerText = "";
  getEle("tbTKNV").style = "display:none";
  getEle("tbTen").innerText = "";
  getEle("tbTen").style = "display:none";
  getEle("tbEmail").innerText = "";
  getEle("tbEmail").style = "display:none";
  getEle("tbMatKhau").innerText = "";
  getEle("tbMatKhau").style = "display:none";
  getEle("tbNgay").innerText = "";
  getEle("tbNgay").style = "display:none";
  getEle("tbLuongCB").innerText = "";
  getEle("tbLuongCB").style = "display:none";
  getEle("tbChucVu").innerText = "";
  getEle("tbChucVu").style = "display:none";
  getEle("tbGiolam").innerText = "";
  getEle("tbGiolam").style = "display:none";
  //sửa lại tiêu đề cho modal
  getEle("header-title").innerHTML = "Thêm nhân viên mới";

  //tạo nút "Add" => gắn vào footer của modal
  var btnAdd = `<button class="btn btn-success" onclick="addNhanVien()" >Thêm</button><button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal"> Đóng </button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
};

function addNhanVien() {
  // lấy thông tin từ user nhập liệu

  if (!validateForm()) {
    return;
  }
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
  getEle("tbTKNV").innerText = "";
  getEle("tbTKNV").style = "display:none";
  getEle("tbTen").innerText = "";
  getEle("tbTen").style = "display:none";
  getEle("tbEmail").innerText = "";
  getEle("tbEmail").style = "display:none";
  getEle("tbMatKhau").innerText = "";
  getEle("tbMatKhau").style = "display:none";
  getEle("tbNgay").innerText = "";
  getEle("tbNgay").style = "display:none";
  getEle("tbLuongCB").innerText = "";
  getEle("tbLuongCB").style = "display:none";
  getEle("tbChucVu").innerText = "";
  getEle("tbChucVu").style = "display:none";
  getEle("tbGiolam").innerText = "";
  getEle("tbGiolam").style = "display:none";
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
  if (!validateForm()) {
    return;
  }
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
function validateForm() {
  // Get input values
  var taiKhoan = getEle("tknv").value;
  var ten = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCB = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  // Reset error messages
  getEle("tbTKNV").innerText = "";
  getEle("tbTKNV").style = "display:none";
  getEle("tbTen").innerText = "";
  getEle("tbTen").style = "display:none";
  getEle("tbEmail").innerText = "";
  getEle("tbEmail").style = "display:none";
  getEle("tbMatKhau").innerText = "";
  getEle("tbMatKhau").style = "display:none";
  getEle("tbNgay").innerText = "";
  getEle("tbNgay").style = "display:none";
  getEle("tbLuongCB").innerText = "";
  getEle("tbLuongCB").style = "display:none";
  getEle("tbChucVu").innerText = "";
  getEle("tbChucVu").style = "display:none";
  getEle("tbGiolam").innerText = "";
  getEle("tbGiolam").style = "display:none";

  // Define validation rules
  var taiKhoanPattern = /^\d{4,6}$/;
  var tenPattern = /^[\p{L}\s]+$/u;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var matKhauPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{6,10}$/;
  var ngayLamPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  var luongCBPattern = /^[1-9]\d{6,7}$/;
  var gioLamPattern =
    /^(80|81|82|83|84|85|86|87|88|89|9[0-9]|100|1[0-9][0-9]|200)$/;

  // Perform validation
  var isValid = true;

  if (!taiKhoanPattern.test(taiKhoan)) {
    getEle("tbTKNV").innerText = "Tài khoản không hợp lệ.";
    getEle("tbTKNV").style = "display:block";

    isValid = false;
  }

  if (!tenPattern.test(ten)) {
    getEle("tbTen").innerText = "Tên không hợp lệ.";
    getEle("tbTen").style = "display:block";
    isValid = false;
  }

  if (!emailPattern.test(email)) {
    getEle("tbEmail").innerText = "Email không hợp lệ.";
    getEle("tbEmail").style = "display:block";
    isValid = false;
  }

  if (!matKhauPattern.test(matKhau)) {
    getEle("tbMatKhau").innerText = "Mật khẩu không hợp lệ.";
    getEle("tbMatKhau").style = "display:block";
    isValid = false;
  }

  if (!ngayLamPattern.test(ngayLam)) {
    getEle("tbNgay").innerText = "Ngày làm không hợp lệ.";
    getEle("tbNgay").style = "display:block";
    isValid = false;
  }

  if (!luongCBPattern.test(luongCB)) {
    getEle("tbLuongCB").innerText = "Lương không hợp lệ.";
    getEle("tbLuongCB").style = "display:block";
    isValid = false;
  }

  if (chucVu === "Chọn chức vụ") {
    getEle("tbChucVu").innerText = "Vui lòng chọn chức vụ.";
    getEle("tbChucVu").style = "display:block";
    isValid = false;
  }

  if (!gioLamPattern.test(gioLam)) {
    getEle("tbGiolam").innerText = "Số giờ làm không hợp lệ.";
    getEle("tbGiolam").style = "display:block";
    isValid = false;
  }

  return isValid;
}
var searchInput = document.getElementById("searchName");
searchInput.addEventListener("input", function () {
  filterTable();
});
function filterTable() {
  var keyword = searchInput.value.toLowerCase(); // Lấy từ khóa và chuyển thành chữ thường

  var rows = document.querySelectorAll("#tableDanhSach tr");

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var loaiNhanVienCell = row.querySelector("td:nth-child(7)"); // Lấy ô chứa loại nhân viên

    if (loaiNhanVienCell) {
      var loaiNhanVien = loaiNhanVienCell.textContent.toLowerCase();

      if (loaiNhanVien.indexOf(keyword) > -1) {
        row.style.display = ""; // Hiển thị hàng nếu từ khóa khớp
      } else {
        row.style.display = "none"; // Ẩn hàng nếu không khớp
      }
    }
  }
}
