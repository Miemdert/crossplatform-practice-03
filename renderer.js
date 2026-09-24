document.addEventListener('DOMContentLoaded', () => {
    // Находим кнопку и список в DOM
    const button = document.querySelector('button');
    const ul = document.querySelector('ul');

    button.addEventListener('click', async () => {
        try {
            ul.innerHTML = '';

            const files = await window.api.listDir('.');
            files.forEach(file => {
                const li = document.createElement('li');
                
                const fileName = typeof file === 'object' ? file.name : file;
                const isDir = typeof file === 'object' ? file.isDirectory : false;

                if (isDir) {
                    li.textContent = `📁 ${fileName}`;
                    li.style.fontWeight = 'bold';
                    li.style.color = '#0056b3'; 
                } else {
                    li.textContent = `📄 ${fileName}`;
                }

                ul.appendChild(li);
            });
        } catch (error) {
            console.error('Ошибка при чтении каталога:', error);
            ul.innerHTML = '';
}
});
});