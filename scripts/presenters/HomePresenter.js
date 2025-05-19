import HomeView from '../views/HomeView.js';

class HomePresenter {
    constructor() {
        this._view = new HomeView();
    }

    tampilkan() {
        this._view.show();
    }
}

export default HomePresenter; 