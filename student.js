import Person from "./person.js";

export default class Student extends Person {
    constructor(_ma, _hoTen, _diaChi, _email, _loai, _toan, _ly, _hoa) {
        super(_ma, _hoTen, _diaChi, _email, _loai);
        this.toan = _toan;
        this.ly = _ly;
        this.hoa = _hoa;
    }

    tinhDiemTrungBinh() {
        return (Number(this.toan) + Number(this.ly) + Number(this.hoa)) / 3;
    }
}