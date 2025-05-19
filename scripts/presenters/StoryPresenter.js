import StoryModel from '../models/StoryModel.js';
import StoryView from '../views/StoryView.js';

class PengelolaStory {
    constructor() {
        this._model = new StoryModel();
        this._view = new StoryView();
    }

    async tampilkan() {
        try {
            this._view.showLoading();
            const stories = await this._model.getStories();
            this._view.showStories(stories);
        } catch (error) {
            this._view.showError(error.message);
        }
    }
}

export default PengelolaStory;