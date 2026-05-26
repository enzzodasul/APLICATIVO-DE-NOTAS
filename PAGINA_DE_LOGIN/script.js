/* =========================================
NOTEFY STUDIO
========================================= */

/* =========================================
TOAST
========================================= */

function mostrarToast(texto) {
  const antigo = document.querySelector('.toast-notefy')

  if (antigo) {
    antigo.remove()
  }

  const toast = document.createElement('div')

  toast.className = 'toast-notefy'

  toast.innerHTML = `
        ${texto}
    `

  Object.assign(toast.style, {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    background: '#131c31',
    color: '#fff',
    padding: '16px 22px',
    borderRadius: '18px',
    zIndex: '999999',
    border: '1px solid rgba(255,255,255,.08)',
    boxShadow: '0 20px 50px rgba(0,0,0,.35)',
  })

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.remove()
  }, 3000)
}

/* =========================================
SALVAR USUARIO
========================================= */

function salvarUsuario(nome, email) {
  localStorage.setItem('notefy_nome', nome)

  localStorage.setItem('notefy_email', email)
}

/* =========================================
CRIAR CONTA
========================================= */

function criarConta() {
  const nome = document.getElementById('nome')?.value.trim()

  const email = document.getElementById('email')?.value.trim()

  const senha = document.getElementById('senha')?.value

  const confirmar = document.getElementById('confirmarSenha')?.value

  if (!nome) {
    mostrarToast('Digite seu nome')

    return
  }

  if (!email) {
    mostrarToast('Digite seu email')

    return
  }

  if (senha.length < 8) {
    mostrarToast('Senha mínima de 8 caracteres')

    return
  }

  if (senha !== confirmar) {
    mostrarToast('As senhas não coincidem')

    return
  }

  const usuario = {
    nome,
    email,
    senha,
    criadoEm: new Date().toISOString(),
  }

  localStorage.setItem('notefy_user', JSON.stringify(usuario))

  salvarUsuario(nome, email)

  mostrarToast('Conta criada com sucesso 🚀')

  setTimeout(() => {
    window.location.href = 'notas.index.html'
  }, 1200)
}

/* =========================================
LOGIN
========================================= */

function fazerLogin() {
  const email = document.getElementById('email')?.value.trim()

  const senha = document.getElementById('senha')?.value

  const usuario = JSON.parse(localStorage.getItem('notefy_user'))

  if (!usuario) {
    mostrarToast('Nenhuma conta encontrada')

    return
  }

  if (email === usuario.email && senha === usuario.senha) {
    salvarUsuario(usuario.nome, usuario.email)

    mostrarToast('Login realizado ✨')

    setTimeout(() => {
      window.location.href = 'perfil_usuario/peril.index.html'
    }, 1000)
  } else {
    mostrarToast('Email ou senha incorretos')
  }
}

/* =========================================
LOGOUT
========================================= */

function logout() {
  localStorage.removeItem('notefy_nome')

  localStorage.removeItem('notefy_email')

  window.location.href = 'PAGINA_DE_LOGIN/login.index.html'
}

/* =========================================
PROTECAO
========================================= */

;(function () {
  const pagina = window.location.pathname.toLowerCase()

  const protegidas = ['APLICATIVO-DE-NOTAS/PAGINA_DE_LOGIN/notas.index.html']

  const precisaLogin = protegidas.some((item) => pagina.includes(item))

  if (!precisaLogin) {
    return
  }

  const nome = localStorage.getItem('notefy_nome')

  if (!nome) {
    window.location.href = 'PAGINA_DE_LOGIN/login.index.html'
  }
})()

/* =========================================
WEB SHARE
========================================= */

async function compartilharArquivo(file) {
  if (
    navigator.canShare &&
    navigator.canShare({
      files: [file],
    })
  ) {
    try {
      await navigator.share({
        title: 'Notefy Studio',

        text: 'Criado com Notefy Studio',

        files: [file],
      })

      mostrarToast('Compartilhado 🚀')
    } catch (error) {
      console.log(error)
    }
  } else {
    mostrarToast('Seu dispositivo não suporta compartilhamento')
  }
}

/* =========================================
UTIL
========================================= */

function obterUsuario() {
  return {
    nome: localStorage.getItem('notefy_nome') || '',

    email: localStorage.getItem('notefy_email') || '',
  }
}

function toggleLikes() {
  const area = document.getElementById('likesArea');

  if (!area) return;

  area.style.display =
    document.getElementById('mostrarLikes').checked
      ? 'flex'
      : 'none';
}