import ListPerson from "./list_person.js";
import Person from "./person.js";
import Validation from "./validations.js";
import Customer from "./customer.js";
import Employee from "./employee.js";
import Student from "./student.js";

const listPerson = new ListPerson();
const validation = new Validation();

// Lấy element theo id
const getEle = (id) => {
    return document.getElementById(id);
}

/************* 1. Hiển thị DS tất cả người dùng **************/
const getListPerson = () => {
    renderUI(listPerson.items);
}
const renderUI = (items) => {
    let content = '';

    if (items.length > 0) {
        items.forEach((person) => {
            content += `
                <tr>
                    <td>${person.ma}</td>
                    <td>${person.hoTen}</td>
                    <td>${person.diaChi}</td>
                    <td>${person.email}</td>
                    <td>${person.loai}</td>
                    <td>
                        <button class="btn btn-info" data-toggle="modal" data-target="#personModal" onclick="suaNguoiDung(${person.ma})">Sửa</button>
                        <button class="btn btn-danger" onclick="xoaNguoiDung(${person.ma})">Xóa</button>
                    </td>
                </tr>
            `;
        });
    } else {
        content = `<div class="col-md-12"><td colspan="6"><p class="text-center">Không tồn tại người dùng nào.</p></td></div>`;
    }

    getEle("tblDSPerson").innerHTML = content;
}

getListPerson();

/************* 2. Thêm Mới Người Dùng *****************/
// Click btnThem, hien thi modal popup
getEle("btnThem").addEventListener("click", () => {
    // Change title model
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Mới Người Dùng";

    // Ẩn / Hiện button
    getEle("btnCapNhatNguoiDung").style.display = "none";
    getEle("btnThemNguoiDung").style.display = "block";
});

// Thêm mới người dùng
getEle("btnThemNguoiDung").addEventListener("click", () => {
    // Lay thong tin tu form
    const _ma = getEle("ma").value;
    const _hoTen = getEle("hoTen").value;
    const _diaChi = getEle("diaChi").value;
    const _email = getEle("email").value;
    const _loai = getEle("loai").value;

    /**
     * Validation
     *  + Kiểm tra Mã đã tồn tại hay chưa, không để trống
     *  + Họ Tên phải là chữ, không để trống
     *  + Email phải đúng định dạng, không để trống
     *  + Kiểm tra email đã tồn tại
     *  + Loại phải chọn hợp lệ, không để trống
     */
    let isValid = true;

    // Kiểm tra rỗng
    isValid &= validation.kiemTraRong(_ma, 'invalidMa', 'Mã không được trống.');
    isValid &= validation.kiemTraRong(_hoTen, 'invalidHoTen', 'Họ Tên không được trống.');
    isValid &= validation.kiemTraRong(_diaChi, 'invalidDiaChi', 'Địa chỉ không được trống.');
    isValid &= validation.kiemTraRong(_email, 'invalidEmail', 'Email không được trống.');

    // Kiểm tra Mã đã tồn tại hay chưa
    isValid &= validation.kiemTraMaTonTai(_ma, 'invalidMa', listPerson.items);

    // Kiểm tra Họ Tên phải là chữ
    isValid &= validation.kiemTraHoTen(_hoTen, 'invalidHoTen');

    // Kiểm tra Email phải đúng định dạng
    isValid &= validation.kiemTraFormatEmail(_email, 'invalidEmail');

    // Kiểm tra Email đã tồn tại
    isValid &= validation.kiemTraEmailTonTai(_email, 'invalidEmail', listPerson.items);

    // Kiểm tra Loại phải chọn hợp lệ
    isValid &= validation.kiemTraLoai(_loai, 'invalidLoai');

    if (isValid == false) {
        return;
    }

    // Tao doi tuong Person
    const person = new Person(_ma, _hoTen, _diaChi, _email, _loai);
    listPerson.themNguoiDung(person);

    // Close popup
    document.getElementsByClassName("close")[0].click();

    // Render list person again
    getListPerson();
});

/************* 3. Xóa Người Dùng *****************/
// Xóa người dùng
const xoaNguoiDung = (ma) => {
    listPerson.xoaNguoiDung(ma);

    // Render list person again
    getListPerson();
}
// Khai bao xoaNguoiDung ra ngoai Window
window.xoaNguoiDung = xoaNguoiDung;

/************* 4. Sửa Người Dùng *****************/
// Bấm Sửa => Hiển thị modal popup để  Sửa
const suaNguoiDung = (ma) => {
    // Change title model
    document.getElementsByClassName("modal-title")[0].innerHTML = "Cập Nhật Người Dùng";

    // Ẩn / Hiện button
    getEle("btnCapNhatNguoiDung").style.display = "block";
    getEle("btnThemNguoiDung").style.display = "none";

    // Read-only field 'ma'
    getEle("ma").readOnly = true;

    // Tim Nguoi dung theo ma
    const person = listPerson.timNguoiDungTheoMa(ma);
    if (person) {
        getEle("ma").value = person.ma;
        getEle("hoTen").value = person.hoTen;
        getEle("diaChi").value = person.diaChi;
        getEle("email").value = person.email;
        getEle("loai").value = person.loai;
    }
}

// Khai bao suaNguoiDung ra ngoai Window
window.suaNguoiDung = suaNguoiDung;

// 'Cap nhat Nguoi dung' khi click button 
getEle("btnCapNhatNguoiDung").addEventListener("click", () => {
    // Lấy thông tin Nguoi Dung đã sửa
    const _ma = getEle("ma").value;
    const _hoTen = getEle("hoTen").value;
    const _diaChi = getEle("diaChi").value;
    const _email = getEle("email").value;
    const _loai = getEle("loai").value;

    /**
     * Validation
     *  + Họ Tên phải là chữ, không để trống
     *  + Email phải đúng định dạng, không để trống
     *  + Kiểm tra email đã tồn tại
     *  + Loại phải chọn hợp lệ, không để trống
     */
     let isValid = true;

     // Kiểm tra rỗng
     isValid &= validation.kiemTraRong(_hoTen, 'invalidHoTen', 'Họ Tên không được trống.');
     isValid &= validation.kiemTraRong(_diaChi, 'invalidDiaChi', 'Địa chỉ không được trống.');
     isValid &= validation.kiemTraRong(_email, 'invalidEmail', 'Email không được trống.');
 
     // Kiểm tra Họ Tên phải là chữ
     isValid &= validation.kiemTraHoTen(_hoTen, 'invalidHoTen');
 
     // Kiểm tra Email phải đúng định dạng
     isValid &= validation.kiemTraFormatEmail(_email, 'invalidEmail');
  
     // Kiểm tra Email đã tồn tại
     isValid &= validation.kiemTraEmailTonTai(_email, 'invalidEmail', listPerson.items);

     // Kiểm tra Loại phải chọn hợp lệ
     isValid &= validation.kiemTraLoai(_loai, 'invalidLoai');
 
     if (isValid == false) {
         return;
     }

    // Câp nhật lại person đã sửa
    const person = new Person(_ma, _hoTen, _diaChi, _email, _loai);
    listPerson.suaNguoiDung(person);

    // Close popup
    document.getElementsByClassName("close")[0].click();

    // Render list person again
    getListPerson();
});


/************* 5. Lọc Danh Sách Người Dùng Theo Loại *****************/
// Lọc theo loại
getEle("selLoai").addEventListener("change", (event) => {
    // const typeValue = getEle("selLoai").value;
    const loai = event.target.value;

    if (loai !== 'all') {
        const listFilter = listPerson.timNguoiDungTheoLoai(loai);

        // Show listFilter
        renderUI(listFilter.items);
    } else {
        // Show listPerson
        renderUI(listPerson.items);
    }
});


/************* 6. Sắp xếp DS theo thứ tự Họ Tên *****************/
// Sắp xếp theo Họ Tên
getEle("selHoTen").addEventListener("change", (event) => {
    // const typeValue = getEle("selLoai").value;
    const valueSelHoTen = event.target.value;
    let isAscending = true;

    if (valueSelHoTen === 'giam') {
        isAscending = false;
    }
    const listFilter = listPerson.sapXepDSNguoiDungTheoHoTen(isAscending);

    // Show listFilter
    renderUI(listFilter);
});