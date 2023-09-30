function Nhanvien(
  _id,
  _taiKhoan,
  _hoTen,
  _email,
  _matKhau,
  _ngayLam,
  _luongCoBan,
  _chucVu,
  _tongLuong,
  _loaiNhanVien,
  _gioLam
) {
  this.id = _id;
  this.taiKhoan = _taiKhoan;
  this.hoTen = _hoTen;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCoBan = _luongCoBan;
  this.chucVu = _chucVu;
  this.tongLuong = _tongLuong;
  this.loaiNhanVien = _loaiNhanVien;
  this.gioLam = _gioLam;
  this.tinhTongLuong = function () {
    switch (this.chucVu) {
      case "Giám đốc":
        this.tongLuong = this.luongCoBan * 3;
        break;
      case "Trưởng phòng":
        this.tongLuong = this.luongCoBan * 2;
        break;
      default:
        this.tongLuong = this.luongCoBan;
        break;
    }
  };

  // Phương thức xếp loại dựa trên giờ làm việc
  this.xepLoai = function () {
    if (this.gioLam >= 192) {
      this.loaiNhanVien = "Nhân viên xuất sắc";
      return this.loaiNhanVien;
    } else if (this.gioLam >= 176) {
      this.loaiNhanVien = "Nhân viên giỏi";
      return this.loaiNhanVien;
    } else if (this.gioLam >= 160) {
      this.loaiNhanVien = "Nhân viên khá";
      return this.loaiNhanVien;
    } else {
      this.loaiNhanVien = "Nhân viên trung bình";
      return this.loaiNhanVien;
    }
  };
}
// +Tài khoản
// +Họ tên
// +Email
// +Mật khẩu
// +Ngày làm
// +Lương cơ bản
// +Chức vụ gồm: Giám đốc, Trưởng Phòng, Nhân Viên
// +Giờ làm trong tháng
// +Tổng lương
// +Loại nhân viên
