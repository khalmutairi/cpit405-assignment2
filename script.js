// 1. نحدد العناصر
const fetchButton = document.getElementById('fetchButton');
const resultsContainer = document.getElementById('resultsContainer');

// 2. نربط الزر بالدالة
fetchButton.addEventListener('click', fetchUser);

// 3. دالة جلب البيانات (Fetch)
async function fetchUser() {
    // رسالة الانتظار
    resultsContainer.innerHTML = '<p>...Fetching user</p>';
    
    // هذا الـ API الجديد والمضمون (لاحظ https)
    const apiUrl = 'https://randomuser.me/api/';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // الـ API هذا يرجع النتائج في مصفوفة اسمها results
        displayUser(data.results[0]);

    } catch (error) {
        resultsContainer.innerHTML = `<p>An error occurred: ${error.message}</p>`;
    }
}

// 4. دالة عرض البيانات
function displayUser(user) {
    // ننظف الحاوية
    resultsContainer.innerHTML = '';

    // نجهز البيانات
    const name = `${user.name.title} ${user.name.first} ${user.name.last}`;
    const email = user.email;
    const phone = user.phone;
    const location = `${user.location.city}, ${user.location.country}`;
    const picture = user.picture.large; // صورة كبيرة

    // نركب الكود (HTML) اللي بنعرضه
    const userCard = `
        <div class="user-card">
            <img src="${picture}" alt="Profile photo of ${name}">
            <h2>${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Location:</strong> ${location}</p>
        </div>
    `;
    
    // نحط الكود في الصفحة
    resultsContainer.innerHTML = userCard;
}