class HomeView {
    constructor() {
        this._content = document.getElementById('content');
    }

    show() {
        this._content.innerHTML = `
            <section class="home-hero">
                <div class="hero-text">
                    <h1>Story API</h1>
                    <p class="subheadline">Bagikan Cerita Anda kepada seluruh penjuru dunia dengan mudah dan cepat</p>
                    <div class="cta">
                        <a href="#/stories" class="button primary">Lihat Cerita</a>
                        <a href="#/add" class="button secondary">Tambah Cerita</a>
                    </div>
                </div>
            </section>
        `;
    }
}

export default HomeView; 