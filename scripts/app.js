import PengelolaStory from './presenters/StoryPresenter.js';
import PengelolaTambahCerita from './presenters/AddStoryPresenter.js';
import PengelolaHome from './presenters/HomePresenter.js';
import PengelolaLogin from './presenters/LoginPresenter.js';
import PengelolaRegister from './presenters/RegisterPresenter.js';
import DataCerita from './models/StoryModel.js';
import { subscribeUser, unsubscribeUser } from './notif.js';
import { getStories, deleteStory, addStory } from './indexedb.js';

class App {
    constructor() {
        this._data = new DataCerita();
        this._setupNavigation();
        this._setupRouting();
        this._setupPushNotifications();
    }

    _setupNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navigationDrawer = document.getElementById('navigationDrawer');

        hamburger.addEventListener('click', () => {
            navigationDrawer.classList.toggle('open');
        });

        // Close drawer when clicking outside
        document.addEventListener('click', (event) => {
            if (!navigationDrawer.contains(event.target) && event.target !== hamburger) {
                navigationDrawer.classList.remove('open');
            }
        });

        this._renderNavLinks();
    }

    _renderNavLinks() {
        const navigationDrawer = document.getElementById('navigationDrawer');
        const ul = navigationDrawer.querySelector('ul');
        ul.innerHTML = `
            <li><a href="#/home">Home</a></li>
            <li><a href="#/stories">Stories</a></li>
            <li><a href="#/add">Add Story</a></li>
            ${this._data.isLoggedIn() ? '<li><a href="#/logout" id="logoutLink">Logout</a></li>' : '<li><a href="#/login">Login</a></li><li><a href="#/register">Register</a></li>'}
        `;
        // Logout event
        const logoutLink = document.getElementById('logoutLink');
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                this._data.logout();
                window.location.hash = '#/login';
                this._renderNavLinks();
            });
        }
    }

    _setupRouting() {
        const routes = {
            '/home': () => {
                const homePresenter = new PengelolaHome();
                homePresenter.tampilkan();
            },
            '/stories': () => {
                const storyPresenter = new PengelolaStory();
                storyPresenter.tampilkan();
            },
            '/add': () => {
                const addStoryPresenter = new PengelolaTambahCerita();
                addStoryPresenter.tampilkan();
            },
            '/login': () => {
                const loginPresenter = new PengelolaLogin();
                loginPresenter.tampilkan();
            },
            '/register': () => {
                const registerPresenter = new PengelolaRegister();
                registerPresenter.tampilkan();
            },
            '/logout': () => {
                this._data.logout();
                this._renderNavLinks();
                window.location.hash = '#/login';
            }
        };

        const defaultRoute = '/home';

        const router = () => {
            // Matikan kamera jika ada instance AddStoryView
            if (window._addStoryView && typeof window._addStoryView.stopCamera === 'function') {
                window._addStoryView.stopCamera();
                window._addStoryView = null;
            }
            this._renderNavLinks();
            const path = window.location.hash.slice(1) || defaultRoute;
            const route = routes[path] || routes[defaultRoute];
            
            // Start view transition
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    route();
                });
            } else {
                route();
            }
        };

        window.addEventListener('hashchange', router);
        window.addEventListener('load', router);
    }

    _setupPushNotifications() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
        }

        // --- PUSH NOTIFICATION BUTTONS ---
        const subscribeBtn = document.getElementById('subscribe-btn');
        const unsubscribeBtn = document.getElementById('unsubscribe-btn');

        const token = localStorage.getItem('token'); 

        subscribeBtn.addEventListener('click', async () => {
            if (!token) {
                alert('Silakan login terlebih dahulu!');
                return;
            }
            try {
                await subscribeUser(token);
                subscribeBtn.style.display = 'none';
                unsubscribeBtn.style.display = 'inline-block';
                alert('Notifikasi diaktifkan!');
            } catch (e) {
                alert('Gagal mengaktifkan notifikasi: ' + e.message);
            }
        });

        unsubscribeBtn.addEventListener('click', async () => {
            if (!token) {
                alert('Silakan login terlebih dahulu!');
                return;
            }
            try {
                await unsubscribeUser(token);
                subscribeBtn.style.display = 'inline-block';
                unsubscribeBtn.style.display = 'none';
                alert('Notifikasi dinonaktifkan!');
            } catch (e) {
                alert('Gagal menonaktifkan notifikasi: ' + e.message);
            }
        });

        // Cek status subscription saat load
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then(reg => {
                reg.pushManager.getSubscription().then(sub => {
                    if (sub) {
                        subscribeBtn.style.display = 'none';
                        unsubscribeBtn.style.display = 'inline-block';
                    } else {
                        subscribeBtn.style.display = 'inline-block';
                        unsubscribeBtn.style.display = 'none';
                    }
                });
            });
        }

        // --- PWA INSTALL BUTTON ---
        let deferredPrompt;
        const installBtn = document.getElementById('install-btn');

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.style.display = 'inline-block';
        });

        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    installBtn.style.display = 'none';
                }
                deferredPrompt = null;
            }
        });
    }
}

const app = new App();

const mainContent = document.querySelector("#main-content");
const skipLink = document.querySelector(".skip-link");

skipLink.addEventListener("click", function (event) {
  event.preventDefault();
  skipLink.blur();
  mainContent.focus();
  mainContent.scrollIntoView();
});

const newStory = {
    title: 'Judul Cerita',
    content: 'Isi cerita di sini...',
};

addStory(newStory);

// Mendapatkan semua cerita
getStories().then(stories => {
    console.log('Daftar Cerita:', stories);
}).catch(error => {
    console.error('Gagal mendapatkan cerita:', error);
});

const storyIdToDelete = 1;
deleteStory(storyIdToDelete).then(() => {
    console.log('Cerita berhasil dihapus!');
}).catch(error => {
    console.error('Gagal menghapus cerita:', error);
}); 