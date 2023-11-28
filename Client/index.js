async function fetchData() {
    try {
        // 데이터를 가져오기 전에 Kakao 지도 API 스크립트를 로드
        

        const response = await fetch('http://localhost:8080/');
        const data = await response.json();
        console.log(data);
        displayData(data); 

    } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
    }
}

fetchData()



function displayData(data) {
    const container = document.getElementById('store');

    // Assuming 'data' is an array of information objects
    data.forEach(info => {
        const infoElement = document.createElement('div');
        infoElement.className = 'banastore';
        infoElement.innerHTML = `<img src="./images/${info.imagename}.jpg"><div><p><b>매점 이름:</b></p> <p>${info.storename}</p><p><b>주소:</b><p> ${info.storeaddress}</p></div>`;
        container.appendChild(infoElement);

    });
}
