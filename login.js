async function onLogin(email, password) {
    console.log("Email:", email);
    console.log("Password:", password);

    const loginData = {
        login_id: email,
        password: password
    };

    try {
        const response = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            document.getElementById('exampleInputEmail1').value = '';
            document.getElementById('exampleInputPassword1').value = '';
        } else {
            console.log('Login failed:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function handleSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('exampleInputEmail1').value;
    const password = document.getElementById('exampleInputPassword1').value;
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    if (email.trim() === '') {
        emailError.textContent = 'Email is required!';
    } else {
        emailError.textContent = '';
    }
    if (password.trim() === '') {
        passwordError.textContent = 'Password is required!';
    } else {
        passwordError.textContent = '';
    }
    if (email.trim() === '' || password.trim() === '') {
        return;
    }
    onLogin(email, password);
}


function clearErrorOnInput(inputFieldId, errorElementId) {
    const inputField = document.getElementById(inputFieldId);
    const errorElement = document.getElementById(errorElementId);

    inputField.addEventListener('input', () => {
        errorElement.textContent = ''; 
    });
}

document.addEventListener('DOMContentLoaded', function() {
    clearErrorOnInput('exampleInputEmail1', 'email-error');
    clearErrorOnInput('exampleInputPassword1', 'password-error');
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', handleSubmit);
});