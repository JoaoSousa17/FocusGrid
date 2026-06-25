# Stripe — subscrição da extensão (1,5€/mês, 7 dias de trial)

Este guia cobre só a monetização da **extensão de browser** (modelo separado da
app web). A app web terá o seu próprio Stripe Price (2€/mês com trial de 7 dias,
3€ via Google Play) — fora do âmbito deste documento.

## 1. Criar a conta Stripe

1. Vai a https://dashboard.stripe.com/register e cria conta com o teu email.
2. Ativa a conta (dados da empresa/individual, IBAN para receber pagamentos) —
   podes começar em **modo de teste** (toggle "Test mode" no canto superior
   direito) sem ativar nada disto ainda, para testar o fluxo completo primeiro.

## 2. Criar o produto e o preço

1. Dashboard → **Product catalog** → **Add product**.
2. Nome: `FocusGrid Extension`.
3. Pricing model: **Recurring**, `1.50 EUR`, billing period **Monthly**.
4. Guarda o **Price ID** gerado (`price_...`) — é o `STRIPE_EXTENSION_PRICE_ID`.

(O trial de 7 dias é tratado pela nossa tabela `extension_subscriptions`, não
precisa de ser configurado como trial no Stripe — o utilizador só é levado ao
Checkout quando o trial termina.)

## 3. Obter as chaves API

Dashboard → **Developers** → **API keys**:
- `Secret key` (`sk_test_...` em teste, `sk_live_...` em produção) → `STRIPE_SECRET_KEY`.

## 4. Configurar o webhook

1. Dashboard → **Developers** → **Webhooks** → **Add endpoint**.
2. URL: `https://<PROJECT_REF>.supabase.co/functions/v1/stripe-webhook`.
3. Eventos a escutar: `checkout.session.completed`, `customer.subscription.created`,
   `customer.subscription.updated`, `customer.subscription.deleted`.
4. Guarda o **Signing secret** (`whsec_...`) → `STRIPE_WEBHOOK_SECRET`.

## 5. Configurar os segredos no Supabase

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
supabase secrets set STRIPE_EXTENSION_PRICE_ID=price_...
supabase secrets set CHECKOUT_SUCCESS_URL=https://focusgrid.app/checkout-success
supabase secrets set CHECKOUT_CANCEL_URL=https://focusgrid.app/checkout-cancel
```

## 6. Aplicar a migração e publicar as funções

```bash
supabase db push
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook --no-verify-jwt
```

O `--no-verify-jwt` no webhook é necessário porque o Stripe chama este endpoint
diretamente, sem um JWT de utilizador Supabase — a função verifica a
autenticidade do pedido pela assinatura `stripe-signature`, não por JWT.

## 7. Testar em modo de teste

- Usa o cartão de teste `4242 4242 4242 4242`, qualquer data futura e CVC.
- Para testar o webhook localmente antes de publicar:
  ```bash
  stripe listen --forward-to https://<PROJECT_REF>.supabase.co/functions/v1/stripe-webhook
  ```
- Confirma na tabela `extension_subscriptions` que `status` passa a `active` e
  `current_period_end` fica preenchido depois de um checkout de teste.

## 8. Passar para produção

1. Desativa "Test mode" no Stripe, repete os passos 2–4 em modo live (price ID
   e webhook secret são diferentes em live).
2. Atualiza os segredos do Supabase com as chaves `sk_live_...`/`whsec_...` e o
   novo `price_...` de produção.
