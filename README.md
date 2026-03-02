# Hummes — Site Premium (Next.js)

Vibe: fundo off-white, pastel, faixas multicolor, cards com sombra leve — inspirado na identidade que tu enviou.

## Rodar local

1) Instalar dependências

```bash
npm install
```

2) Criar arquivo `.env.local`

Copia o `.env.example` e preenche:

```bash
cp .env.example .env.local
```

Troca o `AUTH_SECRET` por um segredo grande.

3) Rodar

```bash
npm run dev
```

Abre: http://localhost:3000

## Páginas
- `/` Início
- `/produtos` Bots e Sites
- `/projetos` Projetos (inclui "em criação")
- `/sobre`
- `/contato` (Whats/Instagram)
- `/cadastro` cria usuário (salva em SQLite)
- `/login`
- `/dashboard` (área logada)

## Banco de dados
- SQLite local em `./data/hummes.sqlite`
- Tabela `users` com: nome, telefone, email, senha hash e interesses.

## Deploy
Recomendado: Vercel.
- Configure as env vars (`AUTH_SECRET`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_INSTAGRAM_URL`).
- SQLite em Vercel (serverless) não é ideal pra produção. Pra produção, a gente migra pra Postgres (Neon/Supabase). Mas pra MVP e rodar local: perfeito.
