document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const userIdInput = document.getElementById('userId');
    const userPasswordInput = document.getElementById('userPassword');

   function checkInputs() {
        const userId = userIdInput.value.trim();
        const userPassword = userPasswordInput.value.trim();

        if (userId && userPassword) {
            loginBtn.classList.add('active');
        } else {
            loginBtn.classList.remove('active');
        }
    } 

    userIdInput.addEventListener('input', checkInputs);
    userPasswordInput.addEventListener('input', checkInputs);

    loginBtn.addEventListener('click', function() {
        const userId = userIdInput.value.trim();
        const userPassword = userPasswordInput.value.trim();
/*미입력시 팝업 에러 */
        if (userId && userPassword) {
            alert('Successfully logged in');
        } else {
            alert('Enter required fields');
        }
    });
});
