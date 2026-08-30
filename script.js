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

  // 5. Envio Real de E-mail via FormSubmit API
  const formContato = document.getElementById('form-contato');
  const statusFormulario = document.getElementById('status-formulario');

  if (formContato && statusFormulario) {
    formContato.addEventListener('submit', async (e) => {
      e.preventDefault();

      const botaoEnviar = formContato.querySelector('button[type="submit"]');
      const textoOriginal = botaoEnviar.innerHTML;

      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const mensagem = document.getElementById('mensagem').value;

      // Estado de envio
      botaoEnviar.disabled = true;
      botaoEnviar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
      statusFormulario.textContent = '';

      try {
        const resposta = await fetch("https://formsubmit.co/ajax/jhonnybrasilianodasilva123etec@gmail.com", {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            Nome: nome,
            Email: email,
            Mensagem: mensagem,
            _subject: `Novo Contato do Portfólio: ${nome}`,
            _template: 'table'
          })
        });

        if (resposta.ok) {
          statusFormulario.style.color = '#10b981';
          statusFormulario.textContent = 'Mensagem enviada com sucesso! O e-mail foi entregue diretamente para mim.';
          formContato.reset();
        } else {
          statusFormulario.style.color = '#ef4444';
          statusFormulario.textContent = 'Erro ao enviar. Caso seja o primeiro teste, verifique seu e-mail para ativar o formulário ou use o WhatsApp!';
        }
      } catch (erro) {
        statusFormulario.style.color = '#ef4444';
        statusFormulario.textContent = 'Erro de conexão ao enviar. Por favor, tente pelo WhatsApp ou envie um e-mail direto!';
      } finally {
        botaoEnviar.disabled = false;
        botaoEnviar.innerHTML = textoOriginal;

        setTimeout(() => {
          statusFormulario.textContent = '';
        }, 8000);
      }
    });
  }
});
