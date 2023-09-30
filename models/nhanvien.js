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
      return "Nhân viên xuất sắc";
    } else if (this.gioLam >= 176) {
      return "Nhân viên giỏi";
    } else if (this.gioLam >= 160) {
      return "Nhân viên khá";
    } else {
      return "Nhân viên trung bình";
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
