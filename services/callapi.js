function CallApi() {
  this.fectchData = function () {
    var promise = axios({
      url: "https://650f9b1954d18aabfe9a2079.mockapi.io/api/Nhanvien",
      method: "GET",
    });

    return promise;
  };

  this.deleteNhanVienById = function (id) {
    var promise = axios({
      url: `https://650f9b1954d18aabfe9a2079.mockapi.io/api/Nhanvien/${id}`,
      method: "DELETE",
    });

    return promise;
  };

  this.addNhanvienApi = function (nhanvien) {
    var promise = axios({
      url: "https://650f9b1954d18aabfe9a2079.mockapi.io/api/Nhanvien",
      method: "POST",
      data: nhanvien,
    });

    return promise;
  };

  this.getNhanVienById = function (id) {
    var promise = axios({
      url: `https://650f9b1954d18aabfe9a2079.mockapi.io/api/Nhanvien/${id}`,
      method: "GET",
    });

    return promise;
  };

  this.updateNhanVienApi = function (nhanvien) {
    return axios({
      url: `https://650f9b1954d18aabfe9a2079.mockapi.io/api/Nhanvien/${nhanvien.id}`,
      method: "PUT",
      data: nhanvien,
    });
  };
}
