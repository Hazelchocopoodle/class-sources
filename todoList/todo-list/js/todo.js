// DOM 요소
const todoInput = document.getElementById('todoInput');
const dueDateInput = document.getElementById('dueDateInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const checkAll = document.getElementById('checkAll');
const completeAllBtn = document.getElementById('completeAllBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');

// 할일 목록 데이터
let todos = [];

// 오늘 날짜를 기본값으로 설정
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    dueDateInput.value = today;
}

// 날짜 포맷 (YYYY-MM-DD -> YYYY.MM.DD)
function formatDate(dateString) {
    return dateString.replace(/-/g, '.');
}

// D-Day 계산
function calculateDDay(dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return { text: `D+${Math.abs(diffDays)}`, class: 'dday-passed' };
    } else if (diffDays === 0) {
        return { text: 'D-Day', class: 'dday-today' };
    } else {
        return { text: `D-${diffDays}`, class: 'dday-future' };
    }
}

// 할일 추가
function addTodo() {
    const task = todoInput.value.trim();
    const dueDate = dueDateInput.value;

    if (!task) {
        alert('할일을 입력해주세요.');
        todoInput.focus();
        return;
    }

    if (!dueDate) {
        alert('날짜를 선택해주세요.');
        dueDateInput.focus();
        return;
    }

    const todo = {
        id: Date.now(),
        task: task,
        createdAt: new Date().toISOString().split('T')[0],
        dueDate: dueDate,
        completed: false
    };

    todos.push(todo);
    renderTodos();

    // 입력 초기화
    todoInput.value = '';
    todoInput.focus();
}

// 할일 목록 렌더링
function renderTodos() {
    if (todos.length === 0) {
        todoList.innerHTML = '<div class="empty-message">등록된 할일이 없습니다.</div>';
        checkAll.checked = false;
        return;
    }

    todoList.innerHTML = todos.map(todo => {
        const dday = calculateDDay(todo.dueDate);
        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="check-col">
                    <input type="checkbox" class="form-check-input todo-check"
                           ${todo.completed ? 'checked' : ''}
                           onchange="toggleComplete(${todo.id})">
                </div>
                <div class="task-col">${escapeHtml(todo.task)}</div>
                <div class="date-col">${formatDate(todo.createdAt)}</div>
                <div class="dday-col">
                    <span class="${dday.class}">${dday.text}</span>
                </div>
                <div class="action-col">
                    <button class="btn btn-outline-success btn-action" onclick="toggleComplete(${todo.id})">
                        ${todo.completed ? '취소' : '완료'}
                    </button>
                    <button class="btn btn-outline-danger btn-action" onclick="deleteTodo(${todo.id})">
                        삭제
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // 전체 선택 체크박스 상태 업데이트
    updateCheckAllState();
}

// HTML 이스케이프 (XSS 방지)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 완료 토글
function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

// 할일 삭제
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

// 전체 선택 체크박스 상태 업데이트
function updateCheckAllState() {
    if (todos.length === 0) {
        checkAll.checked = false;
        return;
    }
    checkAll.checked = todos.every(t => t.completed);
}

// 전체 선택/해제
function toggleCheckAll() {
    const isChecked = checkAll.checked;
    todos.forEach(todo => {
        todo.completed = isChecked;
    });
    renderTodos();
}

// 일괄 완료
function completeAll() {
    const checkedTodos = todos.filter(t => t.completed);
    if (checkedTodos.length === 0) {
        alert('선택된 항목이 없습니다.');
        return;
    }
    // 이미 완료된 상태 유지
    renderTodos();
}

// 선택 항목 일괄 삭제
function deleteAll() {
    const checkedTodos = todos.filter(t => t.completed);
    if (checkedTodos.length === 0) {
        alert('선택된 항목이 없습니다.');
        return;
    }

    if (confirm('선택된 항목을 모두 삭제하시겠습니까?')) {
        todos = todos.filter(t => !t.completed);
        renderTodos();
    }
}

// 이벤트 리스너
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

checkAll.addEventListener('change', toggleCheckAll);
completeAllBtn.addEventListener('click', completeAll);
deleteAllBtn.addEventListener('click', deleteAll);

// 초기화
setDefaultDate();
renderTodos();
