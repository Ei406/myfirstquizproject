document.getElementById('submit-btn').addEventListener('click', function() {
    // 1. Reset previous colors
    const allLabels = document.querySelectorAll('label');
    allLabels.forEach(label => {
        label.classList.remove('wrong-label', 'correct-label');
    });

    // 2. Calculate score
    const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
    let score = 0;
    const totalQuestions = 10; 

    selectedOptions.forEach(option => {
        const labelForSelected = document.querySelector(`label[for="${option.id}"]`);
        if (option.value === "correct") {
            score++;
            if (labelForSelected) labelForSelected.classList.add('correct-label');
        } else {
            if (labelForSelected) labelForSelected.classList.add('wrong-label');
        }
    });

    showPopup(score, totalQuestions);
});

function showPopup(score, total) {
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'resultModal';

    const isPass = score >= 5;
    const icon = isPass ? 'fa-circle-check' : 'fa-circle-xmark';
    const color = isPass ? '#2ecc71' : '#e74c3c';
    const message = isPass ? 'Excellent! 🎉' : 'Try Again! 💪';

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon" style="color: ${color}">
                <i class="fas ${icon}"></i>
            </div>
            <h2 style="color: #2e3a4c">${message}</h2>
            <p style="font-size: 1.2rem;">Your Score: <strong>${score} / ${total}</strong></p>
            <button class="close-btn" onclick="closeModal()">Close & Review</button>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById('resultModal');
    if (modal) {
        modal.remove();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}