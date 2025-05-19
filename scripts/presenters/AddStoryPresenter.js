import StoryModel from '../models/StoryModel.js';
import AddStoryView from '../views/AddStoryView.js';

class AddStoryPresenter {
    constructor() {
        this._model = new StoryModel();
        this._view = new AddStoryView();
        this._setupView();
        window._addStoryView = this._view;
    }

    _setupView() {
        this._view.onSubmit = this._handleSubmit.bind(this);
    }

    async tampilkan() {
        if (!this._model.isLoggedIn()) {
            window.location.hash = '#/login';
            return;
        }
        this._view.showForm();
    }

    async _handleSubmit(storyData) {
        try {
            this._view.showLoading();
            await this._model.addStory(storyData);
            this._view.showSuccess();
        } catch (error) {
            this._view.showError(error.message);
        }
    }
}

export default AddStoryPresenter; 