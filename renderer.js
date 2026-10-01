document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button');
    const infoButton = document.getElementById('infobutton');
    const ulExplorer = document.getElementById('file-list');

    button.addEventListener('click', async () => {
        try {
            ulExplorer.innerHTML = '';

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

                ulExplorer.appendChild(li);
            });
        } catch (error) {
            console.error('Ошибка при чтении каталога:', error);
            ul.innerHTML = '';
}
});

    infoButton.addEventListener('click', async () => {
        const osData = await window.api.getOSdata();
        
        
        const info = `
        <ul>
            <li>Платформа: ${osData.get("platform")}</li>
            <li>Архитектура: ${osData.get("arch")}</li>
            <li>Количество ядер процессора: ${osData.get("cpus").length}</li>
            <li>Общий объем памяти: ${(osData.get("totalmem") / (1024 ** 3)).toFixed(2)} GB</li>
        </ul>
        `;
        const infoWindow = window.open('infowindow.html', 'Информация о системе', 'popup,width=500,height=400');

        if(!infoWindow) {
            alert('Не удалось открыть новое окно. Пожалуйста, разрешите всплывающие окна для этого сайта.');
            return;
        }
       
        infoWindow.onload = () => {
            const sysInfoUl = infoWindow.document.getElementById('system-info');
            sysInfoUl.innerHTML = info;
        };
});
});