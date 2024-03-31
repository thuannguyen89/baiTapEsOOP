import Person from "./person.js";

export default class Employee extends Person {
    constructor(_ma, _hoTen, _diaChi, _email, _loai, _soNgayLamViec, _luongTheoNgay) {
        super(_ma, _hoTen, _diaChi, _email, _loai);
        this.soNgayLamViec = _soNgayLamViec;
        this.luongTheoNgay = _luongTheoNgay;
    }

    tinhLuong() {
        return this.soNgayLamViec * this.luongTheoNgay;
    }
}