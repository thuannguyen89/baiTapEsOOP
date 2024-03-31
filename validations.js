export default class Validation {
    // Lấy element theo id
    getEle(id) {
        return document.getElementById(id);
    }

    kiemTraRong(value, spanId, message) {
        if (value === "") {
            this.getEle(spanId).innerHTML = message;
            return false;
        }

        this.getEle(spanId).innerHTML = "";
        return true;
    };

    kiemTraMaTonTai = function(ma, spanId, items) {
        let isValid = true;
        let message = '';
        
        for (let person of items) {
            if (ma === person.ma) {
                message = `Mã này đã tồn tại.`;
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            this.getEle(spanId).innerHTML = message;
        }

        return isValid;
    }

    kiemTraHoTen(hoTen, spanId) {
        if (!hoTen.match(/^[a-zA-Z ]+$/)) {
            this.getEle(spanId).innerHTML = `Họ tên phải là chữ`;
            return false;
        }

        this.getEle(spanId).innerHTML = "";
        return true;
    }

    kiemTraFormatEmail(email, spanId) {
        let regrexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!regrexEmail.test(email)) {
            this.getEle(spanId).innerHTML = 'Email sai định dạng.';
            return false;
        }

        this.getEle(spanId).innerHTML = "";
        return true;
    }

    kiemTraEmailTonTai = function(email, spanId, items) {
        let isValid = true;
        let message = '';
        
        for (let person of items) {
            if (email === person.email) {
                message = `Email này đã tồn tại.`;
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            this.getEle(spanId).innerHTML = message;
        }

        return isValid;
    }

    kiemTraLoai(loai, spanId) {
        if (!loai) {
            this.getEle(spanId).innerHTML = 'Phải chọn loại hợp lệ.';
            return false;
        }

        this.getEle(spanId).innerHTML = "";
        return true;
    }
}