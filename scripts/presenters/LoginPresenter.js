import DataCerita from '../models/StoryModel.js';
import TampilanLogin from '../views/LoginView.js';

class PengelolaLogin {
    constructor() {
        this._data = new DataCerita();
        this._tampilan = new TampilanLogin();
        this._tampilan.saatSubmit = this._tanganiSubmit.bind(this);
    }

    tampilkan() {
        this._tampilan.tampilkanForm();
    }

    async _tanganiSubmit({ email, password }) {
        try {
            this._tampilan.tampilkanLoading();
            await this._data.login({ email, password });
            document.querySelectorAll('.overlay').forEach(el => el.remove());
            window.location.hash = '#/stories';
        } catch (error) {
            document.querySelectorAll('.overlay').forEach(el => el.remove());
            this._tampilan.tampilkanError(error.message);
        }
    }
}

export default PengelolaLogin; 