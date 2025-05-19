import StoryModel from '../models/StoryModel.js';
import RegisterView from '../views/RegisterView.js';

class RegisterPresenter {
    constructor() {
        this._model = new StoryModel();
        this._view = new RegisterView();
        this._view.onSubmit = this._handleSubmit.bind(this);
    }

    tampilkan() {
        this._view.showForm();
    }

    async _handleSubmit({ name, email, password }) {
        try {
            this._view.showLoading();
            await this._model.register({ name, email, password });
            window.location.hash = '#/login';
        } catch (error) {
            this._view.showError(error.message);
        }
    }
}

export default RegisterPresenter; 