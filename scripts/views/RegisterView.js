class RegisterView {
    constructor() {
        this._content = document.getElementById('content');
    }

    showForm() {
        this._content.innerHTML = `
            <div class="form-container">
                <h2>Register</h2>
                <form id="registerForm">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required autocomplete="name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required autocomplete="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required autocomplete="new-password" minlength="8">
                    </div>
                    <button type="submit">Register</button>
                </form>
                <p>Sudah punya akun? <a href="#/login">Login</a></p>
            </div>
        `;
        this._setupEventListeners();
    }

    _setupEventListeners() {
        const form = document.getElementById('registerForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (this.onSubmit) {
                this.onSubmit({ name, email, password });
            }
        });
    }

    showError(message) {
        this._content.innerHTML += `
            <div class="error-message">
                <p>${message}</p>
            </div>
        `;
    }

    showLoading() {
        this._content.innerHTML += `
            <div class="loading">
                <p>Loading...</p>
            </div>
        `;
    }
}

export default RegisterView; 