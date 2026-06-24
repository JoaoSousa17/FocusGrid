import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-cream px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-all">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-1">Termos de Serviço</h1>
        <p className="text-xs text-muted-foreground mb-8">Última atualização: {new Date().toLocaleDateString("pt-PT")}</p>

        <div className="space-y-6 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">1. Aceitação dos termos</h2>
            <p>Ao criares uma conta e utilizares o FocusGrid, aceitas estes Termos de Serviço. Se não concordares com algum ponto, não deves utilizar a aplicação.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">2. Descrição do serviço</h2>
            <p>O FocusGrid é uma aplicação de produtividade pessoal que oferece um temporizador de foco (Pomodoro), gestão de tarefas, hábitos, prazos e funcionalidades de assistência por IA. O serviço é fornecido "tal como está", sem garantias de disponibilidade contínua.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">3. Conta de utilizador</h2>
            <p>És responsável por manter a confidencialidade das tuas credenciais de acesso e por toda a atividade realizada na tua conta. Deves fornecer informação verdadeira no registo.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">4. Utilização aceitável</h2>
            <p>Não deves usar o FocusGrid para fins ilegais, para tentar aceder sem autorização a sistemas de terceiros, ou para enviar conteúdo abusivo, difamatório ou que infrinja direitos de terceiros.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">5. Conteúdo do utilizador</h2>
            <p>Mantens a propriedade de todo o conteúdo que crias (tarefas, hábitos, notas, gravações de reuniões, etc.). Concedes-nos uma licença limitada para armazenar e processar esse conteúdo apenas com o propósito de fornecer o serviço.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">6. Funcionalidades de IA</h2>
            <p>Algumas funcionalidades (sugestões de hábitos, resumos de reuniões, transcrição de áudio) recorrem a modelos de linguagem de terceiros. Os resultados são gerados automaticamente e podem conter imprecisões — usa o teu próprio juízo antes de agir com base neles.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">7. Suspensão e cessação</h2>
            <p>Podemos suspender ou encerrar contas que violem estes termos. Podes encerrar a tua conta em qualquer momento, eliminando os teus dados através das definições ou contactando-nos.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">8. Alterações aos termos</h2>
            <p>Podemos atualizar estes termos periodicamente. Alterações materiais serão comunicadas dentro da aplicação. O uso continuado do serviço após uma alteração implica aceitação dos novos termos.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">9. Limitação de responsabilidade</h2>
            <p>O FocusGrid não se responsabiliza por perdas indiretas, perda de dados ou lucros resultantes do uso ou impossibilidade de uso do serviço, na máxima medida permitida por lei.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">10. Contacto</h2>
            <p>Para questões sobre estes termos, contacta-nos através do email de suporte indicado na aplicação.</p>
          </section>
        </div>
      </div>
    </div>);

}
