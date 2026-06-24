import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-cream px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-all">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-1">Política de Privacidade</h1>
        <p className="text-xs text-muted-foreground mb-8">Última atualização: {new Date().toLocaleDateString("pt-PT")}</p>

        <div className="space-y-6 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">1. Que dados recolhemos</h2>
            <p>Recolhemos o teu email e password (geridos de forma segura através do Supabase Auth), e o conteúdo que crias na aplicação: tarefas, hábitos, tags, prazos, eventos, sessões de foco, notas e gravações de reuniões (incluindo áudio e transcrições geradas por funcionalidades de IA).</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">2. Como usamos os dados</h2>
            <p>Os dados são usados exclusivamente para fornecer e melhorar as funcionalidades do FocusGrid: gerir a tua conta, guardar o teu progresso, gerar resumos e sugestões através de IA, e enviar emails transacionais (por exemplo, confirmação de conta ou recuperação de password).</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">3. Partilha com terceiros</h2>
            <p>Utilizamos o Supabase como fornecedor de base de dados, autenticação e armazenamento. Algumas funcionalidades de IA (resumos, transcrição de áudio, sugestões) recorrem a serviços de modelos de linguagem de terceiros para processar o conteúdo que submetes. Não vendemos os teus dados a terceiros.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">4. Retenção e eliminação</h2>
            <p>Mantemos os teus dados enquanto a tua conta estiver ativa. Podes eliminar a tua conta e todos os dados associados em qualquer momento através das definições da aplicação ou contactando-nos.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">5. Cookies e armazenamento local</h2>
            <p>Utilizamos armazenamento local do navegador (local storage) para manter a tua sessão e preferências. Não utilizamos cookies de publicidade ou rastreamento de terceiros.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">6. Os teus direitos</h2>
            <p>Tens o direito de acederes, corrigires ou eliminares os teus dados pessoais em qualquer momento. Para exercer estes direitos, contacta-nos através do email de suporte indicado na aplicação.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">7. Segurança</h2>
            <p>Aplicamos medidas técnicas e organizativas adequadas para proteger os teus dados, incluindo autenticação segura e controlo de acesso aos dados ao nível da base de dados.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">8. Alterações a esta política</h2>
            <p>Podemos atualizar esta política periodicamente. Alterações materiais serão comunicadas dentro da aplicação. O uso continuado do serviço após uma alteração implica aceitação da nova política.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">9. Contacto</h2>
            <p>Para questões sobre esta política de privacidade, contacta-nos através do email de suporte indicado na aplicação.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
