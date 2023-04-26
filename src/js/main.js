document.addEventListener('click', e => {
    const el = e.target;
    const tag = el.tagName.toLowerCase()

    if (tag === 'button') {
        e.preventDefault()
        verificaLinhaTabela()
    }
});

// 1vj31oy1r

async function verificaLinhaTabela() {
    const valorId = getUniqueId();
    await fetch(`https://sheetdb.io/api/v1/uqvsshr8ayn1r/search?id=${valorId}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.length != 0) {
                console.log('achou o id!');
                updateDosDados();
            } else {
                console.log('não achou o id!');
                criaLinhaTabela();
            };
        });

};

async function criaLinhaTabela() {
    const campoNome = document.querySelector('#nome')
    const campoEmail = document.querySelector('#email')
    const valorCampoNome = campoNome.value;
    const valorCompoEmail = campoEmail.value;
    const valorId = getUniqueId();
    await fetch('https://sheetdb.io/api/v1/uqvsshr8ayn1r', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: [
                {
                    'nome': valorCampoNome,
                    'email': valorCompoEmail,
                    'id': valorId
                }
            ]
        })
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
};


async function updateDosDados() {
    const campoNome = document.querySelector('#nome')
    const campoEmail = document.querySelector('#email')
    const valorCampoNome = campoNome.value;
    const valorCompoEmail = campoEmail.value;
    const valorId = getUniqueId();
    console.log(valorId);
    await fetch(`https://sheetdb.io/api/v1/uqvsshr8ayn1r/id/${valorId}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: {
                'nome': valorCampoNome,
                'email': valorCompoEmail
            }
        })
    })
        .then((response) => response.json())
        .then((data) => console.log(data));

};

function getUniqueId() {
    let uniqueId = localStorage.getItem('machineId');

    if (!uniqueId) {
        uniqueId = Math.random().toString(36).substr(2, 9);
        localStorage.setItem('machineId', uniqueId);
    }
    return uniqueId;
};
