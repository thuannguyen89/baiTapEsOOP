export default class ListPerson {
    constructor() {
        this.items = [];
    }

    // Thêm người dùng mới
    themNguoiDung(person) {
        // ES5: this.items.push(person);
        // ES6: SpeadOperator
        this.items = [...this.items, person];
    }

    // Tìm vị trị 1 người dùng theo mã
    timViTriNguoiDungTheoMa(ma) {
        // ES5: for (var i = 0; i < this.items; i++)...
        // ES6: for ... in 
        for (let index in this.items) {
            if (this.items[index].ma == ma) {
                return index;
            }
        }
    }

    // Tìm 1 người dùng theo mã
    timNguoiDungTheoMa(ma) {
        // ES5: for (var i = 0; i < this.items; i++)...
        // ES6: for ... of
        for (let person of this.items) {
            if (person.ma == ma) {
                return person;
            }
        }

        return null;
    }

    // Xoa nguoi dung theo ma
    xoaNguoiDung(ma) {
        let index = this.timViTriNguoiDungTheoMa(ma);
        if (index !== -1) {
            // Su dung splice 
            this.items.splice(index, 1);
        }
    }

    // Sua nguoi dung 
    suaNguoiDung(person) {
        let index = this.timViTriNguoiDungTheoMa(person.ma);
        if (index !== -1) {
            this.items[index] = person;
        }
    }

    // Tim nguoi dung theo ho ten
    timNguoiDungTheoHoTen(hoTen) {
        let listPersonFilter = new ListPerson();
        hoTen = hoTen.trim().toUpperCase();

        for (let person of this.items) {
            let pHoTen = person.hoTen.trim().toUpperCase();
            if (photen.search(hoTen) !== -1) {
                listPersonFilter.items = [...listPersonFilter.items, person];
            }
        }

        return listPersonFilter;
    }

    // Tim nguoi dung theo loại
    timNguoiDungTheoLoai(_loai) {
        let listPersonFilter = new ListPerson();

        for (let person of this.items) {
            if (person.loai === _loai) {
                listPersonFilter.items = [...listPersonFilter.items, person];
            }
        }

        return listPersonFilter;
    }


    // Sắp xếp list guoi dung theo Ho Tên
    sapXepDSNguoiDungTheoHoTen(isAscending = true) {
        if (isAscending) {
            return this.items.sort((personB, personA) => {
                let hoTenA = personA.hoTen.trim().toUpperCase();
                let hoTenB = personB.hoTen.trim().toUpperCase();

                if (hoTenB > hoTenA) {
                    return 1; // Giữ nguyên
                }

                if (hoTenB < hoTenA) {
                    return -1; // Đảo vị trí
                }

                return 1;
            });
        } else {
            return this.items.sort((personB, personA) => {
                let hoTenA = personA.hoTen.trim().toUpperCase();
                let hoTenB = personB.hoTen.trim().toUpperCase();

                if (hoTenB > hoTenA) {
                    return -1; // Giữ nguyên
                }

                if (hoTenB < hoTenA) {
                    return 1; // Đảo vị trí
                }

                return -1;
            });
        }
    }
}