class TampilanLogin {
    constructor() {
        this._content = document.getElementById('content');
    }

    tampilkanForm() {
        this._content.innerHTML = `
            <div class="form-container">
                <h2>Login</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required autocomplete="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required autocomplete="current-password">
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>Belum punya akun? <a href="#/register">Daftar Akun Sekarang!</a></p>
            </div>
        `;
        this._pasangEventListener();
    }

    _pasangEventListener() {
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (this.saatSubmit) {
                this.saatSubmit({ email, password });
            }
        });
    }

    tampilkanError(pesan) {
        this._content.innerHTML += `
            <div class="error-message">
                <p>${pesan}</p>
            </div>
        `;
    }

    tampilkanLoading() {
        document.querySelectorAll('.overlay').forEach(el => el.remove());
        const popup = document.createElement('div');
        popup.className = 'success-popup';
        popup.innerHTML = `
            <h2>Loading...</h2>
            <p>Silakan tunggu, sedang memproses login Anda...</p>
        `;
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
    }
}

export default TampilanLogin; 