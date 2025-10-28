import Sidebar from "../Shared/Sidebar";

const BarberDashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar role="barber" />
      <main>
        <h1>Bem-vindo, Pedro!</h1>
        <section>
          <h2>Próximo corte</h2>
          <p>Terça, 29 de Outubro – 16:00</p>
          <p>Cliente: Ignácio Timóteo</p>
        </section>
        <section>
          <h2>Agenda de hoje</h2>
          {/* Lista de clientes */}
        </section>
        <section>
          <h2>Histórico de cortes</h2>
          {/* Cards com estilos */}
        </section>
      </main>
    </div>
  );
};

export default BarberDashboard;