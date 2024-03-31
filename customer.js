import Person from "./person.js";

export default class Customer extends Person {
    constructor(_ma, _hoTen, _diaChi, _email, _loai, _tenCongTy, _giaTriHoaDon, _danhGia) {
        super(_ma, _hoTen, _diaChi, _email, _loai);
        this.tenCongTy = _tenCongTy;
        this.giaTriHoaDon = _giaTriHoaDon;
        this.danhGia = _danhGia;
    }
}