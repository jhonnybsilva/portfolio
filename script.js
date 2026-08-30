/* ===================================================
   PORTFÓLIO PROFISSIONAL - INTERATIVIDADE (JAVASCRIPT)
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualizar Ano no Rodapé
  const elementoAno = document.getElementById('ano-atual');
  if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
  }

  // 2. Alternador de Tema Claro / Escuro
  const botaoTema = document.getElementById('botao-tema');
  const temaSalvo = localStorage.getItem('tema_portfolio') || 'dark';

  // Aplica o tema salvo no carregamento
  document.documentElement.setAttribute('data-theme', temaSalvo);

  if (botaoTema) {
    botaoTema.addEventListener('click', () => {
      const temaAtual = document.documentElement.getAttribute('data-theme');
      const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', novoTema);
      localStorage.setItem('tema_portfolio', novoTema);
    });
  }

  // 3. Menu Mobile (Hamburguer)
  const botaoMenu = document.getElementById('botao-menu');
  const menuNavegacao = document.getElementById('menu-navegacao');
  const linksNav = document.querySelectorAll('.link-nav');

  if (botaoMenu && menuNavegacao) {
    botaoMenu.addEventListener('click', () => {
      menuNavegacao.classList.toggle('aberto');
      const estaAberto = menuNavegacao.classList.contains('aberto');
      botaoMenu.innerHTML = estaAberto 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Fechar menu mobile ao clicar em um link
    linksNav.forEach(link => {
      link.addEventListener('click', () => {
        if (menuNavegacao.classList.contains('aberto')) {
          menuNavegacao.classList.remove('aberto');
          botaoMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
      });
    });
  }

  // 4. Destaque de Link Ativo ao Rolar a Página
  const secoes = document.querySelectorAll('section[id]');

  const destacarLinkNoScroll = () => {
    const posicaoScroll = window.scrollY + 200;

    secoes.forEach(secao => {
      const topoSecao = secao.offsetTop;
      const alturaSecao = secao.offsetHeight;
      const idSecao = secao.getAttribute('id');

      if (posicaoScroll >= topoSecao && posicaoScroll < topoSecao + alturaSecao) {
        linksNav.forEach(link => {
          link.classList.remove('ativo');
          if (link.getAttribute('href') === `#${idSecao}`) {
            link.classList.add('ativo');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', destacarLinkNoScroll);

  // 5. Simulação de Envio do Formulário de Contato
  const formContato = document.getElementById('form-contato');
  const statusFormulario = document.getElementById('status-formulario');

  if (formContato && statusFormulario) {
    formContato.addEventListener('submit', (e) => {
      e.preventDefault();

      const botaoEnviar = formContato.querySelector('button[type="submit"]');
      const textoOriginal = botaoEnviar.innerHTML;

      // Estado de envio
      botaoEnviar.disabled = true;
      botaoEnviar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
      statusFormulario.textContent = '';

      // Simulação de envio com sucesso após 1.5s
      setTimeout(() => {
        botaoEnviar.disabled = false;
        botaoEnviar.innerHTML = textoOriginal;
        statusFormulario.style.color = '#10b981';
        statusFormulario.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
        formContato.reset();

        setTimeout(() => {
          statusFormulario.textContent = '';
        }, 5000);
      }, 1500);
    });
  }
});
