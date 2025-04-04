// DOM elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const googleLoginBtn = document.getElementById('google-login');
const errorMessage = document.getElementById('error-message');
const authButtons = document.getElementById('auth-buttons');
const userMenu = document.getElementById('user-menu');
const userName = document.getElementById('user-name');
const logoutButton = document.getElementById('logout-button');

// Check if user is already logged in
auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in
    console.log('User is signed in:', user);
    
    // Update UI for authenticated user
    if (authButtons) {
      authButtons.style.display = 'none';
    }
    
    if (userMenu) {
      userMenu.style.display = 'block';
      userName.textContent = user.displayName || user.email.split('@')[0];
    }
    
    // If on login page, redirect to home
    if (window.location.href.includes('login.html') || window.location.href.includes('register.html')) {
      window.location.href = '../index.html';
    }
    
    // Show comment form if on article page
    const commentForm = document.getElementById('comment-form');
    const loginPrompt = document.getElementById('login-prompt');
    
    if (commentForm && loginPrompt) {
      commentForm.style.display = 'block';
      loginPrompt.style.display = 'none';
    }
  } else {
    // User is signed out
    console.log('User is signed out');
    
    // Update UI for unauthenticated user
    if (authButtons) {
      authButtons.style.display = 'flex';
    }
    
    if (userMenu) {
      userMenu.style.display = 'none';
    }
    
    // Show login prompt if on article page
    const commentForm = document.getElementById('comment-form');
    const loginPrompt = document.getElementById('login-prompt');
    
    if (commentForm && loginPrompt) {
      commentForm.style.display = 'none';
      loginPrompt.style.display = 'block';
    }
  }
});

// Login with email and password
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get user info
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    
    // Sign in user
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Clear the form
        loginForm.reset();
        
        // Redirect to home
        window.location.href = '../index.html';
      })
      .catch(err => {
        // Display error message
        errorMessage.textContent = err.message;
        errorMessage.style.display = 'block';
      });
  });
}

// Register with email and password
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get user info
    const email = registerForm.email.value;
    const password = registerForm.password.value;
    const confirmPassword = registerForm['confirm-password'].value;
    const terms = registerForm.terms.checked;
    
    // Validate form
    if (password !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match';
      errorMessage.style.display = 'block';
      return;
    }
    
    if (!terms) {
      errorMessage.textContent = 'You must agree to the terms and conditions';
      errorMessage.style.display = 'block';
      return;
    }
    
    // Create user
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Clear the form
        registerForm.reset();
        
        // Create user profile in Firestore
        return db.collection('users').doc(userCredential.user.uid).set({
          email: email,
          displayName: email.split('@')[0],
          createdAt: new Date(),
          savedArticles: []
        });
      })
      .then(() => {
        // Redirect to home
        window.location.href = '../index.html';
      })
      .catch(err => {
        // Display error message
        errorMessage.textContent = err.message;
        errorMessage.style.display = 'block';
      });
  });
}

// Login with Google
if (googleLoginBtn) {
  googleLoginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    auth.signInWithPopup(provider)
      .then(result => {
        // Check if this is a new user
        const isNewUser = result.additionalUserInfo.isNewUser;
        
        if (isNewUser) {
          // Create user profile in Firestore for new users
          return db.collection('users').doc(result.user.uid).set({
            email: result.user.email,
            displayName: result.user.displayName || result.user.email.split('@')[0],
            createdAt: new Date(),
            savedArticles: []
          });
        }
      })
      .then(() => {
        // Redirect to home
        window.location.href = '../index.html';
      })
      .catch(err => {
        // Display error message
        if (errorMessage) {
          errorMessage.textContent = err.message;
          errorMessage.style.display = 'block';
        }
      });
  });
}

// Logout
if (logoutButton) {
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    auth.signOut()
      .then(() => {
        // Redirect to home
        window.location.href = '../index.html';
      })
      .catch(err => {
        console.error('Logout failed:', err);
      });
  });
} 