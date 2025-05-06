# Simulador de Entrevista Técnica

Um quiz interativo para praticar conhecimentos de lógica, JavaScript, HTML, CSS e raciocínio lógico, simulando entrevistas técnicas de tecnologia!

## 🚀 Funcionalidades

- **Perguntas de múltipla escolha** sobre programação e lógica.
- **Três níveis de dificuldade:** Fácil (sem tempo), Médio (90s por pergunta) e Difícil (30s por pergunta).
- **Barra de progresso** visual.
- **Feedback imediato:** mostra se você acertou ou errou cada questão, com explicação.
- **Ranking local por dificuldade:** registre seu nome ao final do quiz e veja os melhores resultados para cada nível de dificuldade.
- **Sons de feedback** para respostas corretas, erradas, próxima pergunta e finalização.

## 🎮 Como jogar

1. Escolha o nível de dificuldade na tela inicial.
2. Clique em **Iniciar Entrevista**.
3. Responda às perguntas dentro do tempo (se aplicável).
4. Ao finalizar, digite seu nome para entrar no ranking local da dificuldade escolhida.
5. Veja o resultado final e tente melhorar sua pontuação!

## 🏆 Ranking

- O ranking é salvo localmente no seu navegador, separado por dificuldade (`Fácil`, `Médio`, `Difícil`).
- Para cada nível, apenas os 5 melhores resultados ficam registrados.
- O ranking mostra o nome, pontuação e data de cada jogador.

## 💻 Como rodar localmente

1. **Clone este repositório:**
git clone https://github.com/seuusuario/simulador-entrevista-tecnica.git

text
2. **Acesse a pasta do projeto:**
cd simulador-entrevista-tecnica

text
3. **Abra o arquivo `index.html` em seu navegador.**
- Não é necessário instalar dependências.
- O projeto funciona 100% em HTML, CSS (Tailwind CDN) e JavaScript puro.

## 📂 Estrutura do projeto

index.html<br>
script.js<br>
questions.js<br>


## ✨ Personalize!

- Adicione novas perguntas em `questions.js` (inclua o campo `explanation` para mostrar explicações após cada resposta).
- Troque os sons das respostas alterando os links nas tags `<audio>` do `index.html`.
- Modifique o estilo facilmente usando Tailwind CSS.

## 📢 Contribua!

Sugestões de melhorias, novas perguntas e pull requests são muito bem-vindos!

---

**Divirta-se praticando para entrevistas técnicas! 🚀**
